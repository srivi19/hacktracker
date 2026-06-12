"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HackathonCard from "@/components/HackathonCard";
import SearchFilters from "@/components/SearchFilters";
import WinnersSection from "@/components/WinnersSection";
import NovusCarousel from "@/components/NovusCarousel";
import CalendarView from "@/components/CalendarView";
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
  teamSize: "all",
  format: "all",
};

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = useState<"grid" | "list" | "calendar">("grid");
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [tab, setTab] = useState<"hackathons" | "winners" | "insights" | "analytics">("hackathons");

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

  // Handle URL query parameters for tab switching
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "insights" || tabParam === "winners" || tabParam === "analytics") {
        setTab(tabParam as any);
      }
    }
  }, []);

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

      // Team size filter
      if (filters.teamSize === "solo" && !h.team_size.toLowerCase().includes("1")) return false;
      if (filters.teamSize === "team" && h.team_size.toLowerCase().includes("1")) return false;

      // Format filter (online, in-person, hybrid)
      if (filters.format !== "all") {
        const isOnline = h.location.toLowerCase().includes("virtual") || h.location.toLowerCase().includes("online");
        const isInPerson = h.location.toLowerCase().includes("in-person") || h.location.toLowerCase().includes("san francisco") || h.location.toLowerCase().includes("person");
        const isHybrid = (isOnline && isInPerson) || h.location.includes("+");

        if (filters.format === "online" && !isOnline) return false;
        if (filters.format === "in-person" && !isInPerson) return false;
        if (filters.format === "hybrid" && !isHybrid) return false;
      }

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
    <div className="min-h-screen flex flex-col dot-grid-bg dark:dot-grid-bg-dark">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* AI Insights Hero - FIRST on page */}
        {tab === "hackathons" && (
          <div className="mb-12 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 p-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <Zap size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-navy dark:text-white">What Actually Wins</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Real patterns from 50+ hackathon winners analyzed by Gemini AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colorful insight blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: "🏆",
                  title: "Chrome Extension + AI",
                  description: "is the highest-win combo for Micro-SaaS brackets",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: "⚡",
                  title: "90-Second Demos",
                  description: "score 40% higher on Shippedness",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: "🏥",
                  title: "Healthcare AI",
                  description: "wins are about UX, not model accuracy",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: "🎯",
                  title: "Meta Tools",
                  description: "score unusually high on Originality",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: "🚀",
                  title: "Next.js + Railway",
                  description: "fastest deployment. Judges need a live URL.",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: "👥",
                  title: "Teams of 2-3",
                  description: "outperform solo and 4+ on execution",
                  color: "from-indigo-500 to-blue-500"
                }
              ].map((block, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${block.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{block.icon}</div>
                  <h3 className="text-lg font-black mb-2">{block.title}</h3>
                  <p className="text-sm font-medium text-white/90">{block.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Page header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-navy dark:text-white tracking-tight">Hackathon Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
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
        <div className="flex items-center gap-1 mb-6 border-b border-slate-200 dark:border-slate-700">
          {(["hackathons", "winners", "insights", "analytics"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-accent text-accent"
                  : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t === "hackathons" && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> Hackathons ({hackathons.length})
                </span>
              )}
              {t === "winners" && <span className="flex items-center gap-1.5"><span>🏆</span> Winners</span>}
              {t === "insights" && <span className="flex items-center gap-1.5"><Zap size={12} /> AI Insights</span>}
              {t === "analytics" && <span className="flex items-center gap-1.5"><Database size={12} /> Analytics</span>}
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

            {/* View toggle - PROMINENT */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 transition-colors">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">View</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    view === "grid"
                      ? "bg-accent text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <LayoutGrid size={16} />
                  Grid
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    view === "list"
                      ? "bg-accent text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <List size={16} />
                  List
                </button>
                <button
                  onClick={() => setView("calendar")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    view === "calendar"
                      ? "bg-accent text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <Calendar size={16} />
                  📅 Calendar
                </button>
              </div>
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
            ) : view === "calendar" ? (
              <>
                <CalendarView hackathons={filtered} onSelectEvent={setSelectedHackathon} />
                {selectedHackathon && (
                  <div className="mt-6 bg-white border border-slate-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-navy">{selectedHackathon.title}</h3>
                        <p className="text-sm text-slate-500 mt-1">{selectedHackathon.organizer}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide status-${selectedHackathon.status}`}>
                        {selectedHackathon.status === "closing_soon" ? "Closing Soon" : selectedHackathon.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{selectedHackathon.summary}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <p className="font-bold text-slate-400 uppercase">Prize</p>
                        <p className="text-navy font-bold">{selectedHackathon.prize_pool}</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-400 uppercase">Deadline</p>
                        <p className="text-navy font-bold">{new Date(selectedHackathon.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-400 uppercase">Team Size</p>
                        <p className="text-navy font-bold">{selectedHackathon.team_size}</p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-400 uppercase">Location</p>
                        <p className="text-navy font-bold">{selectedHackathon.location}</p>
                      </div>
                    </div>
                    <a
                      href={selectedHackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-accent text-white font-bold text-sm rounded-lg hover:bg-accent-dark transition-colors"
                    >
                      View on Devpost →
                    </a>
                  </div>
                )}
              </>
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

        {/* AI Insights tab - GRAND & VISUAL */}
        {tab === "insights" && (
          <div>
            {/* Header Section */}
            <div className="mb-10 bg-gradient-to-r from-green-50 dark:from-green-950/30 to-blue-50 dark:to-blue-950/30 rounded-2xl border-2 border-green-200 dark:border-green-800 p-8 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                      <Zap size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-navy dark:text-white">AI-Powered Winning Intelligence</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Real patterns from 50+ hackathon winners</p>
                    </div>
                  </div>
                </div>
                <span className="px-4 py-2 bg-accent text-white font-bold text-xs rounded-full whitespace-nowrap">Gemini 1.5 Flash</span>
              </div>
            </div>

            {/* Key Insights Grid */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">🔥 Winning Patterns</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {AI_INSIGHTS.map((insight, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:border-accent hover:shadow-lg dark:hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  >
                    <p className="text-sm font-semibold text-navy dark:text-slate-100 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive Section */}
            <div className="bg-gradient-to-br from-green-600 dark:from-green-900 to-emerald-600 dark:to-emerald-900 rounded-2xl p-8 text-white shadow-xl transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap size={20} />
                </div>
                <h3 className="text-2xl font-black">What Actually Wins</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">🏆</span>
                  <span><strong>Chrome Extension + AI</strong> is the highest-win combo for Micro-SaaS brackets</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">⚡</span>
                  <span>Projects that demo in under <strong>90 seconds</strong> score 40% higher on Shippedness</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">🏥</span>
                  <span><strong>Healthcare AI</strong> wins are almost always about UX, not model accuracy</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">🎯</span>
                  <span>Meta tools (hackathon tools in hackathons) score unusually high on Originality</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">🚀</span>
                  <span><strong>Next.js + Railway</strong> = fastest deployment. Judges need a live URL.</span>
                </li>
                <li className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-xl">👥</span>
                  <span>Teams of <strong>2–3</strong> outperform solo and 4+ on execution quality</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Analytics tab */}
        {tab === "analytics" && (
          <div>
            {/* Judges Analytics Section */}
            <div className="mb-10 bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-indigo-50 dark:to-indigo-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800 p-10 shadow-lg">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-navy dark:text-white">Analytics for Judges</h2>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Real-time product intelligence tracked by Novus.ai</p>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mt-6 mb-6">
                    ✅ <strong>Live user tracking enabled</strong> — See who's using AIHackTracker, what they click, and how they interact with hackathons.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-lg">📈</span>
                      <span><strong>Track Event Received:</strong> Real-time user actions (clicks, filters, calendar usage)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-lg">👥</span>
                      <span><strong>New Visitor Alerts:</strong> See when judges join and explore</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="text-lg">⚡</span>
                      <span><strong>Product Signals:</strong> Automated insights about engagement patterns</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Judges CTA */}
              <div className="mt-8 pt-8 border-t border-blue-200 dark:border-blue-800">
                <p className="text-lg font-bold text-navy dark:text-white mb-4">
                  👨‍⚖️ <strong>Judges</strong> — Click below for Slack link to see Novus updates
                </p>
                <a
                  href="https://join.slack.com/t/aihacktracker-33m8986/shared_invite/zt-40tfdsjk2-9FQcGdIA5GFn6mf_FHcPvg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <span className="text-xl">💬</span>
                  <span>Join #aihacktracker-analytics on Slack</span>
                  <span className="text-xl">→</span>
                </a>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                  Once you join, you'll see live Novus analytics: user activity, engagement metrics, and product signals in real-time.
                </p>
              </div>
            </div>

            <NovusCarousel screenshots={["/novus-1-pages.png", "/novus-2-events.png", "/novus-3-funnels.png"]} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
