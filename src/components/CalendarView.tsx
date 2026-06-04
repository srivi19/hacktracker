"use client";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Hackathon } from "@/types";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Props {
  hackathons: Hackathon[];
  onSelectEvent: (hackathon: Hackathon) => void;
}

export default function CalendarView({ hackathons, onSelectEvent }: Props) {
  // Convert hackathons to calendar events
  const events = hackathons.map((h) => ({
    id: h.id,
    title: h.title,
    start: new Date(h.deadline),
    end: new Date(h.deadline),
    resource: h,
  }));

  const eventStyleGetter = (event: any) => {
    let backgroundColor = "#6366f1"; // default indigo

    if (event.resource.status === "closing_soon") {
      backgroundColor = "#ef4444"; // red
    } else if (event.resource.status === "open") {
      backgroundColor = "#10b981"; // green
    } else if (event.resource.status === "upcoming") {
      backgroundColor = "#f59e0b"; // amber
    } else if (event.resource.status === "closed") {
      backgroundColor = "#6b7280"; // gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4" style={{ height: "600px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        onSelectEvent={(event) => onSelectEvent(event.resource)}
        eventPropGetter={eventStyleGetter}
        popup
      />
    </div>
  );
}
