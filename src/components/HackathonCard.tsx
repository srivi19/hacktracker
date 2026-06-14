"use client";
import { useState, useEffect } from "react";
import { Calendar, Users, ExternalLink, Star, Clock, Heart } from "lucide-react";
import type { Hackathon } from "@/types";
import { generateGoogleCalendarUrl, downloadICalEvent } from "@/lib/calendar-utils";

interface Props {
  hackathon: Hackathon;
}

function getDaysLeft(deadline: string): number {
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function urgencyClass(days: number): string {
  if (days <= 3) return "urgency-high";
  if (days <= 7) return "urgency-med";
  return "urgency-low";
}

const STATUS_LABELS: Record<string, string> = {
  open: "Open",
  closing_soon: "Closing Soon",
  upcoming: "Upcoming",
  closed: "Closed",
};

export default function HackathonCard({ hackathon: h }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const daysLeft = getDaysLeft(h.deadline);
  const deadlineDate = new Date(h.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Load bookmark status from localStorage
  useEffect(() => {
    const bookmarked = localStorage.getItem(`bookmark-${h.id}`);
    setIsBookmarked(bookmarked === "true");
  }, [h.id]);

  const handleAddToCalendar = () => {
    const calendarUrl = generateGoogleCalendarUrl(h);
    window.open(calendarUrl, "_blank");
  };

  const handleBookmark = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    if (newState) {
      localStorage.setItem(`bookmark-${h.id}`, "true");
    } else {
      localStorage.removeItem(`bookmark-${h.id}`);
    }
  };

  return (
    <div className="hack-card flex flex-col">
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide status-${h.status}`}>
            {STATUS_LABELS[h.status]}
          </span>
          {h.featured && (
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <Star size={9} fill="currentColor" /> Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 ml-2 shrink-0">
          <button
            onClick={handleBookmark}
            title={isBookmarked ? "Remove bookmark" : "Save hackathon"}
            className="text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <Heart size={16} fill={isBookmarked ? "currentColor" : "none"} className={isBookmarked ? "text-red-500 dark:text-red-400" : ""} />
          </button>
          <span className="text-sm font-black text-accent">{h.prize_pool}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-navy text-sm leading-snug mb-1">{h.title}</h3>
      <p className="text-[11px] text-slate-400 font-medium mb-2">{h.organizer} · {h.category}</p>

      {/* AI summary */}
      <p className="text-xs text-slate-600 italic mb-3 flex-1 leading-relaxed">
        &quot;{h.summary}&quot;
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {h.tech_tags.slice(0, 4).map((tag) => (
          <span key={tag} className="chip-green text-[10px]">{tag}</span>
        ))}
        {h.tech_tags.length > 4 && (
          <span className="chip text-[10px] text-slate-400">+{h.tech_tags.length - 4}</span>
        )}
      </div>

      {/* Metadata row */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 mb-3">
        <span className="flex items-center gap-1">
          <Calendar size={10} /> {deadlineDate}
        </span>
        <span className="flex items-center gap-1">
          <Users size={10} /> {h.team_size}
        </span>
        <span className="truncate max-w-[100px]">{h.location}</span>
      </div>

      {/* Countdown + CTA */}
      <div className="flex items-center justify-between gap-2">
        <span className={`flex items-center gap-1 text-xs font-semibold ${urgencyClass(daysLeft)}`}>
          <Clock size={11} />
          {daysLeft > 0 ? `${daysLeft}d left` : "Closed"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCalendar}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors cursor-pointer"
            title="Add to Google Calendar"
          >
            <Calendar size={11} />
          </button>
          <a
            href={h.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-dark transition-colors"
          >
            View <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}
