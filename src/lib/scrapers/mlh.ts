import * as cheerio from "cheerio";
import type { Hackathon, HackathonStatus } from "@/types";

const MLH_URL = "https://mlh.io/seasons/2026/events";

function parseMLHDate(dateStr: string): string {
  // MLH dates look like "May 31st - Jun 1st, 2026" or "Jun 7th, 2026"
  try {
    // Extract end date — everything after the dash or just the full date
    const cleaned = dateStr
      .replace(/(\d+)(st|nd|rd|th)/g, "$1") // remove ordinal suffixes
      .trim();

    const parts = cleaned.split(/[-–]/);
    const endPart = (parts[parts.length - 1] || parts[0]).trim();

    // If end part has no year, grab from original
    const yearMatch = cleaned.match(/\d{4}/);
    const withYear = yearMatch && !endPart.includes(yearMatch[0])
      ? `${endPart} ${yearMatch[0]}`
      : endPart;

    const parsed = new Date(withYear);
    if (!isNaN(parsed.getTime())) return parsed.toISOString();
  } catch {
    // fall through
  }
  return new Date(Date.now() + 14 * 86400000).toISOString();
}

function inferStatus(deadline: string): HackathonStatus {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = diff / 86400000;
  if (days < 0) return "closed";
  if (days <= 3) return "closing_soon";
  if (days <= 60) return "open";
  return "upcoming";
}

export async function scrapeMLH(): Promise<Partial<Hackathon & { source: string; scraped_at: string }>[]> {
  const res = await fetch(MLH_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AIHackTracker/1.0; +https://hacktracker.app)",
      Accept: "text/html",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`MLH fetch failed: ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const events: Partial<Hackathon & { source: string; scraped_at: string }>[] = [];

  // MLH event cards — selector based on their current markup
  $(".event-wrapper, .event, [class*='event-block']").each((_, el) => {
    const $el = $(el);

    const title =
      $el.find("h3, .event-name, [class*='name']").first().text().trim() ||
      $el.find("a").first().attr("title") || "";

    if (!title || title.length < 3) return;

    const url =
      $el.find("a[href*='mlh.io'], a[href*='hackathon']").first().attr("href") ||
      $el.find("a").first().attr("href") || MLH_URL;

    const fullUrl = url.startsWith("http") ? url : `https://mlh.io${url}`;

    const dateText =
      $el.find(".event-date, [class*='date'], time").first().text().trim() ||
      $el.find("[datetime]").first().attr("datetime") || "";

    const location =
      $el.find(".event-location, [class*='location'], .city").first().text().trim() ||
      "In-Person / Hybrid";

    const school =
      $el.find(".event-school, .school, [class*='school']").first().text().trim() || "";

    const deadline = parseMLHDate(dateText);
    const status = inferStatus(deadline);

    // Skip events that are clearly over
    if (status === "closed") return;

    const id = `mlh-${title.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40)}`;

    events.push({
      id,
      title,
      organizer: school || "Major League Hacking",
      url: fullUrl,
      deadline,
      prize_pool: "Prizes + Swag",
      theme: "Student Hackathon",
      tech_tags: ["Beginner-Friendly", "In-Person", "Student"],
      team_size: "2–5",
      difficulty: "Beginner" as const,
      location: location || "Various",
      summary: `${title} — MLH student hackathon${school ? ` at ${school}` : ""}${location ? ` in ${location}` : ""}.`,
      description: `Major League Hacking event: ${title}. ${dateText}`,
      status,
      category: "Student Hackathon",
      participants: 0,
      featured: false,
      source: "mlh",
      scraped_at: new Date().toISOString(),
    });
  });

  console.log(`MLH scraper found ${events.length} events`);
  return events;
}
