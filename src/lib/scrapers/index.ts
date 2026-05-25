import { scrapeDevpost } from "./devpost";
import { scrapeMLH } from "./mlh";
import type { Hackathon } from "@/types";

export type ScrapedHackathon = Partial<Hackathon & {
  devpost_id?: string;
  source: string;
  scraped_at: string;
}>;

export interface ScrapeResult {
  hackathons: ScrapedHackathon[];
  sources: {
    devpost: { count: number; error?: string };
    mlh: { count: number; error?: string };
  };
  total: number;
  scraped_at: string;
}

export async function scrapeAllSources(existingIds: Set<string> = new Set()): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    hackathons: [],
    sources: {
      devpost: { count: 0 },
      mlh: { count: 0 },
    },
    total: 0,
    scraped_at: new Date().toISOString(),
  };

  // Run both scrapers in parallel — one failure won't kill the other
  const [devpostResult, mlhResult] = await Promise.allSettled([
    scrapeDevpost(),
    scrapeMLH(),
  ]);

  // Devpost results
  if (devpostResult.status === "fulfilled") {
    const items = devpostResult.value;
    result.sources.devpost.count = items.length;
    result.hackathons.push(...items);
    console.log(`✅ Devpost: ${items.length} hackathons`);
  } else {
    result.sources.devpost.error = String(devpostResult.reason);
    console.error("❌ Devpost scraper failed:", devpostResult.reason);
  }

  // MLH results
  if (mlhResult.status === "fulfilled") {
    const items = mlhResult.value;
    result.sources.mlh.count = items.length;
    result.hackathons.push(...items);
    console.log(`✅ MLH: ${items.length} hackathons`);
  } else {
    result.sources.mlh.error = String(mlhResult.reason);
    console.error("❌ MLH scraper failed:", mlhResult.reason);
  }

  // Deduplicate by id
  const seen = new Set<string>();
  result.hackathons = result.hackathons.filter((h) => {
    if (!h.id || seen.has(h.id)) return false;
    seen.add(h.id);
    return true;
  });

  result.total = result.hackathons.length;
  return result;
}
