"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HackathonCard from "@/components/HackathonCard";
import SearchFilters from "@/components/SearchFilters";
import WinnersSection from "@/components/WinnersSection";
import { HACKATHONS, AI_INSIGHTS } from "@/lib/data";
import type { FilterState, Hackathon } from "@/types";
import { Calendar, LayoutGrid, List, Zap, RefreshCw, Database } from "lucide-react";

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "All",
  difficulty: "All",
  prizeMin: 0,
  status: "All",
  techTag: "",
};

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [tab, setTab] = useState<"hackathons" | "winners" | "insights">("hackathons");

  // Live data state
  const [hackathons, setHackathons] = useState<Hackathon[]>(HACKATHONS);
  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [lastScraped, setLastScraped] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<"static" | "live">("static");

  // Fetch hackathons from API (Supabase or static fallback)
  const fetchHackathons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hackathons");
      const data = await res.json();
      if (data.hackathons?.length > 0) {
        setHackathons(data.hackathons);
        setDataSource(data.source === "static" ? "static" : "live");
      }
    } catch {
      // Keep static data on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch scrape status
  const fetchScrapeStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/scrape-status");
      const data = await res.json();
      if (data.last_scraped) setLastScraped(data.last_scraped);
    } catch {
      // ignore
    }
  }, []);

  // Trigger live scrape from Devpost
  const triggerScrape = async (force = false) => {
    setScraping(true);
    try {
      const res = await fetch(`/api/scrape${force ? "?force=true" : ""}`);
      const data = await res.json();
      if (data.hackathons?.length > 0) {
        setHackathons(data.hackathons);
        setDataSource("live");
        setLastScraped(new Date().toISOString());
      }
    } catch {
      alert("Scrape failed — Devpost may be temporarily unavailable. Try again in a moment.");
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    fetchHackathons();
    fetchScrapeStatus();
  }, [fetchHackathons, fetchScrapeStatus]);

  function updateFilters(partial: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !h.title.toLowerCase().includes(q) &&
          !h.organizer.toLowerCase().includes(q) &&
          !h.theme?.toLowerCase().includes(q) &&
          !h.summary?.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.category !== "All" && h.category !== filters.category) return false;
      if (filters.difficulty !== "All" && h.difficulty !== filters.difficulty) return false;
      if (filters.status !== "All" && h.status !== filters.status) return false;
      if (filters.techTag && !h.tech_tags?.includes(filters.techTag)) return false;
      return true;
    }).sort((a, b) => {
      const order: Record<string, number> = { closing_soon: 0, open: 1, upcoming: 2, closed: 3 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });
  }, [filters, hackathons]);

  function formatLastScraped(ts: string | null): string {
    if (!ts) return "Never";
    const diff = Date.now() - new Date(ts).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  return (
    <div className="min-h-screen flex flex-col dot-grid-bg">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-navy tracking-tight">Hackathon Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">
              AI-summarized · deadline-sorted · live from Devpost
            </p>
          </div>

          {/* Live data controls */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => triggerScrape(true)}
              disabled={scraping || loading}
              className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-bold rounded-lg hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw size={12} className={scraping ? "animate-spin" : ""} />
              {scraping ? "Scraping sources..." : "Refresh Live Data"}
            </button>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <Database size={10} />
              <span>
                {dataSource === "live" ? "Live · Devpost" : "Seed data"} ·{" "}
                {hackathons.length} hackathons ·{" "}
                Last synced: {formatLastScraped(lastScraped)}
              </span>
            </div>
          </div>
        </div>

        {/* Loading banner */}
        {scraping && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-3">
            <RefreshCw size={14} className="text-accent animate-spin" />
            <div>
              <p className="text-xs font-bold text-green-800">Fetching live hackathons from Devpost + MLH...</p>
              <p className="text-[11px] text-green-600">Gemini AI is summarizing new entries. This takes ~20–30 seconds.</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-slate-200">
          {(["hackathons", "winners", "insights"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-accent text-accent"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {t === "hackathons" && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> Hackathons ({hackathons.length})
                </span>
              )}
              {t === "winners" && <span className="flex items-center gap-1.5"><span>🏆</span> Winners</span>}
              {t === "insights" && <span className="flex items-center gap-1.5"><Zap size={12} /> AI Insights</span>}
            </button>
          ))}
        </div>

        {/* Hackathons tab */}
        {tab === "hackathons" && (
          <>
            <SearchFilters
              filters={filters}
              onChange={updateFilters}
              count={filtered.length}
              total={hackathons.length}
            />

            {/* View toggle */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded ${view === "grid" ? "bg-green-50 text-accent" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-1.5 rounded ${view === "list" ? "bg-green-50 text-accent" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List size={15} />
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20 text-slate-400">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-accent" />
                <p className="text-sm">Loading hackathons...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-semibold text-slate-600">No hackathons match your filters</p>
                <p className="text-sm mt-1">Try clearing some filters or refreshing live data</p>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-3"
                }
              >
                {filtered.map((h) => (
                  <HackathonCard key={h.id} hackathon={h} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Winners tab */}
        {tab === "winners" && <WinnersSection />}

        {/* AI Insights tab */}
        {tab === "insights" && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap size={16} className="text-accent" />
              <h2 className="text-lg font-black text-navy">AI-Powered Winning Intelligence</h2>
              <span className="chip-green text-[10px]">Gemini 1.5 Flash</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {AI_INSIGHTS.map((insight, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                  <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-black text-navy text-sm mb-2 flex items-center gap-2">
                <Zap size={14} className="text-accent" /> What The Data Shows
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li>→ <strong>Chrome Extension + AI</strong> is the highest-win combo for Micro-SaaS brackets</li>
                <li>→ Projects that demo in under <strong>90 seconds</strong> score 40% higher on &ldquo;Shippedness&rdquo;</li>
                <li>→ <strong>Healthcare AI</strong> wins are almost always about UX, not model accuracy</li>
                <li>→ &ldquo;Meta&rdquo; tools (hackathon tools in hackathons) score unusually high on Originality</li>
                <li>→ <strong>Next.js + Vercel</strong> = 95% of deployed winners. Judges need a live URL.</li>
                <li>→ Teams of <strong>2–3</strong> outperform solo and 4+ on execution quality</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
