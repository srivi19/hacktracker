import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { summarizeHackathon } from "@/lib/gemini";
import { scrapeAllSources } from "@/lib/scrapers";

const STALE_HOURS = 48;

function isStale(lastScraped: string | null): boolean {
  if (!lastScraped) return true;
  return (Date.now() - new Date(lastScraped).getTime()) / 3600000 >= STALE_HOURS;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "true";

  // Check if scrape is needed
  let shouldScrape = force;
  if (!shouldScrape && supabase) {
    const { data: meta } = await supabase
      .from("scrape_meta")
      .select("last_scraped")
      .eq("id", 1)
      .single();
    shouldScrape = isStale(meta?.last_scraped ?? null);
  } else if (!supabase) {
    shouldScrape = true;
  }

  if (!shouldScrape && supabase) {
    const { data } = await supabase
      .from("hackathons")
      .select("*")
      .order("deadline", { ascending: true });
    return NextResponse.json({
      hackathons: data ?? [],
      scraped: false,
      message: "Returned cached data",
    });
  }

  // --- Run all scrapers ---
  try {
    // Get existing IDs to avoid re-summarizing
    const existingIds = new Set<string>();
    if (supabase) {
      const { data } = await supabase.from("hackathons").select("id");
      (data ?? []).forEach((r: { id: string }) => existingIds.add(r.id));
    }

    const scrapeResult = await scrapeAllSources(existingIds);
    console.log(`Scraped ${scrapeResult.total} total from ${Object.keys(scrapeResult.sources).length} sources`);

    // Gemini summarize: new hackathons OR existing ones with a poor/missing summary
    const needsSummary = (h: (typeof scrapeResult.hackathons)[0]) => {
      if (!h.title) return false;
      const s = (h.summary ?? "").trim();
      return !s || s === h.title || s === `${h.title}...` || s.length < 20;
    };

    const withSummaries = await Promise.all(
      scrapeResult.hackathons.map(async (h) => {
        if (needsSummary(h) && h.description) {
          try {
            h.summary = await summarizeHackathon(
              h.title ?? "",
              h.description,
              h.prize_pool ?? "TBD",
              h.deadline ?? ""
            );
          } catch {
            h.summary = h.description?.slice(0, 120) ?? h.title;
          }
        }
        return h;
      })
    );

    // Upsert to Supabase
    if (supabase && withSummaries.length > 0) {
      const { error } = await supabase
        .from("hackathons")
        .upsert(withSummaries, { onConflict: "id" });
      if (error) console.error("Supabase upsert error:", error);

      await supabase
        .from("scrape_meta")
        .update({
          last_scraped: new Date().toISOString(),
          last_count: withSummaries.length,
          status: "ok",
        })
        .eq("id", 1);
    }

    return NextResponse.json({
      hackathons: withSummaries,
      scraped: true,
      total: withSummaries.length,
      sources: scrapeResult.sources,
      message: `Scraped ${withSummaries.length} hackathons from Devpost + MLH`,
    });
  } catch (err) {
    console.error("Scrape error:", err);
    return NextResponse.json({ error: "Scrape failed", detail: String(err) }, { status: 500 });
  }
}
