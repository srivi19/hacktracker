import type { Hackathon, HackathonStatus } from "@/types";

const DEVPOST_API = "https://devpost.com/api/hackathons.json";

interface DevpostHackathon {
  id: number;
  title: string;
  url: string;
  display_location: string;
  open_state: string;
  prize_amount: string | number | null;
  submissions_count: number;
  time_left_to_submission: string;
  submission_period_dates: string;
  themes: Array<{ id: number; name: string }>;
  organization_name: string;
  tagline?: string;
}

function mapStatus(openState: string, timeLeft: string): HackathonStatus {
  if (openState === "ended") return "closed";
  if (openState === "upcoming") return "upcoming";
  if (timeLeft && /\b[1-3] days?\b|hours?/i.test(timeLeft)) return "closing_soon";
  return "open";
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function parsePrize(amount: string | number | null): string {
  if (!amount) return "TBD";
  if (typeof amount === "number") {
    if (amount === 0) return "TBD";
    return amount >= 1000 ? `$${(amount / 1000).toFixed(0)}K` : `$${amount}`;
  }
  const cleaned = stripHtml(String(amount));
  if (!cleaned || cleaned === "$0" || cleaned === "0") return "TBD";
  return cleaned;
}

function parseDeadline(dates: string): string {
  if (!dates) return new Date(Date.now() + 30 * 86400000).toISOString();
  const parts = dates.split(/[–—-]/);
  const endStr = parts[parts.length - 1].trim();
  const parsed = new Date(endStr);
  return isNaN(parsed.getTime()) ? new Date(Date.now() + 30 * 86400000).toISOString() : parsed.toISOString();
}

async function fetchPage(page: number): Promise<DevpostHackathon[]> {
  const url = `${DEVPOST_API}?order_by[]=deadline&challenge_type[]=online&per_page=24&page=${page}&status[]=open&status[]=upcoming`;
  const res = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "AIHackTracker/1.0" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Devpost API ${res.status}`);
  const data = await res.json();
  return data.hackathons ?? [];
}

export async function scrapeDevpost(): Promise<Partial<Hackathon & { devpost_id: string; source: string; scraped_at: string }>[]> {
  const [p1, p2] = await Promise.allSettled([fetchPage(1), fetchPage(2)]);
  const raw: DevpostHackathon[] = [
    ...(p1.status === "fulfilled" ? p1.value : []),
    ...(p2.status === "fulfilled" ? p2.value : []),
  ];

  return raw.map((h) => ({
    id: `devpost-${h.id}`,
    devpost_id: String(h.id),
    title: h.title,
    organizer: h.organization_name || "Devpost",
    url: h.url,
    deadline: parseDeadline(h.submission_period_dates),
    prize_pool: parsePrize(h.prize_amount),
    theme: h.themes?.map((t) => t.name).join(", ") || "General",
    tech_tags: h.themes?.map((t) => t.name).slice(0, 5) ?? ["Open"],
    team_size: "1–5",
    difficulty: "All levels" as const,
    location: h.display_location || "Global · Virtual",
    summary: h.tagline ?? "",
    description: [
      h.tagline,
      h.themes?.length ? `Themes: ${h.themes.map((t) => t.name).join(", ")}` : null,
      h.display_location ? `Location: ${h.display_location}` : null,
      h.submission_period_dates ? `Dates: ${h.submission_period_dates}` : null,
      h.prize_amount ? `Prize: ${parsePrize(h.prize_amount)}` : null,
      h.submissions_count ? `${h.submissions_count} submissions` : null,
    ].filter(Boolean).join(". ") || h.title,
    status: mapStatus(h.open_state, h.time_left_to_submission),
    category: h.themes?.[0]?.name ?? "General",
    participants: h.submissions_count ?? 0,
    featured: false,
    source: "devpost",
    scraped_at: new Date().toISOString(),
  }));
}
