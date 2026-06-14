"use client";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { FilterState } from "@/types";
import { CATEGORIES, TECH_TAGS } from "@/lib/data";

interface Props {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  count: number;
  total: number;
}

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced", "All levels"];
const STATUSES = ["All", "open", "closing_soon", "upcoming", "closed"];
const TEAM_SIZES = ["All", "solo", "team"];
const FORMATS = ["All", "online", "in-person", "hybrid"];

export default function SearchFilters({ filters, onChange, count, total }: Props) {
  const hasActive =
    filters.search ||
    filters.category !== "All" ||
    filters.difficulty !== "All" ||
    filters.status !== "All" ||
    filters.techTags.length > 0 ||
    filters.teamSize !== "all" ||
    filters.format !== "all";

  function reset() {
    onChange({ search: "", category: "All", difficulty: "All", status: "All", techTags: [], teamSize: "all", format: "all" });
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
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

        {/* Team Size */}
        <select
          value={filters.teamSize || "all"}
          onChange={(e) => onChange({ teamSize: e.target.value })}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 bg-slate-50 text-slate-700"
        >
          {TEAM_SIZES.map((t) => (
            <option key={t} value={t.toLowerCase()}>
              {t === "All" ? "Team Size" : t === "solo" ? "Solo" : "With Team"}
            </option>
          ))}
        </select>

        {/* Format */}
        <select
          value={filters.format || "all"}
          onChange={(e) => onChange({ format: e.target.value })}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 bg-slate-50 text-slate-700"
        >
          {FORMATS.map((f) => (
            <option key={f} value={f.toLowerCase()}>
              {f === "All" ? "Format" : f === "in-person" ? "In-Person" : f === "hybrid" ? "Online + In-Person" : "Online"}
            </option>
          ))}
        </select>
      </div>

      {/* Tech stack filter section */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Filter by Tech Stack (Multi-select)</p>
        <div className="flex flex-wrap gap-2">
          {TECH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const newTags = filters.techTags.includes(tag)
                  ? filters.techTags.filter(t => t !== tag)
                  : [...filters.techTags, tag];
                onChange({ techTags: newTags });
              }}
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                filters.techTags.includes(tag)
                  ? "bg-accent text-white border-accent shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-green-300"
              }`}
              title={filters.techTags.includes(tag) ? "Click to deselect" : "Click to filter"}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
