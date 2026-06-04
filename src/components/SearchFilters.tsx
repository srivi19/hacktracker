"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { FilterState } from "@/types";
import { CATEGORIES, TECH_TAGS } from "@/lib/data";

declare global {
  interface Window {
    pendo?: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}

interface Props {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  count: number;
  total: number;
}

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced", "All levels"];
const STATUSES = ["All", "open", "closing_soon", "upcoming", "closed"];

export default function SearchFilters({ filters, onChange, count, total }: Props) {
  const hasActive =
    filters.search ||
    filters.category !== "All" ||
    filters.difficulty !== "All" ||
    filters.status !== "All" ||
    filters.techTag;

  function reset() {
    window.pendo?.track("hackathon_filters_reset", {
      previous_search_query: filters.search.substring(0, 100),
      previous_category_filter: filters.category,
      previous_difficulty_filter: filters.difficulty,
      previous_status_filter: filters.status,
      previous_tech_tag_filter: filters.techTag || "none",
      previous_results_count: count,
    });
    onChange({ search: "", category: "All", difficulty: "All", status: "All", techTag: "" });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <SlidersHorizontal size={14} className="text-slate-400" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Filters</span>
        <span className="ml-auto text-xs text-slate-400">
          Showing <span className="font-bold text-navy">{count}</span> of {total}
        </span>
        {hasActive && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium"
          >
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-1">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search hackathons..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-green-400 bg-slate-50"
          />
        </div>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 bg-slate-50 text-slate-700"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value })}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 bg-slate-50 text-slate-700"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Status" : s === "closing_soon" ? "Closing Soon" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        {/* Difficulty */}
        <select
          value={filters.difficulty}
          onChange={(e) => onChange({ difficulty: e.target.value })}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 bg-slate-50 text-slate-700"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Tech tag pills */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {TECH_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onChange({ techTag: filters.techTag === tag ? "" : tag })}
            className={`text-[10px] font-medium px-2.5 py-1 rounded-full border transition-colors ${
              filters.techTag === tag
                ? "bg-accent text-white border-accent"
                : "bg-white text-slate-600 border-slate-200 hover:border-green-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
