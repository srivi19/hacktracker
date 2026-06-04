"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Hackathon } from "@/types";

interface Props {
  hackathons: Hackathon[];
  onSelectEvent: (hackathon: Hackathon) => void;
}

export default function CalendarView({ hackathons, onSelectEvent }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthDays = getDaysInMonth(currentDate);
  const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const emptyDays = Array(firstDayOfWeek).fill(null);

  // Group hackathons by deadline date
  const hackathonsByDate: Record<string, Hackathon[]> = {};
  hackathons.forEach((h) => {
    const dateKey = new Date(h.deadline).toLocaleDateString("en-US");
    if (!hackathonsByDate[dateKey]) hackathonsByDate[dateKey] = [];
    hackathonsByDate[dateKey].push(h);
  });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "closing_soon":
        return "bg-red-100 text-red-700 border-red-200";
      case "open":
        return "bg-green-100 text-green-700 border-green-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-xs font-bold text-slate-500 py-2 uppercase">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: monthDays }, (_, i) => {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
          const dateKey = date.toLocaleDateString("en-US");
          const dayHackathons = hackathonsByDate[dateKey] || [];
          const isToday =
            date.toDateString() === new Date().toDateString();

          return (
            <div
              key={i + 1}
              className={`aspect-square border rounded-lg p-1 text-xs overflow-hidden flex flex-col ${
                isToday
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-slate-200 hover:border-slate-300"
              } transition-colors`}
            >
              <p className={`font-bold ${isToday ? "text-green-700" : "text-slate-600"}`}>
                {i + 1}
              </p>
              <div className="flex flex-col gap-0.5 mt-0.5 flex-1 overflow-y-auto">
                {dayHackathons.slice(0, 2).map((h) => (
                  <button
                    key={h.id}
                    onClick={() => onSelectEvent(h)}
                    className={`rounded px-1 py-0.5 text-[10px] font-bold truncate cursor-pointer hover:opacity-80 transition-opacity border ${getStatusColor(
                      h.status
                    )}`}
                    title={h.title}
                  >
                    {h.title}
                  </button>
                ))}
                {dayHackathons.length > 2 && (
                  <p className="text-[10px] text-slate-500 px-1">
                    +{dayHackathons.length - 2} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
