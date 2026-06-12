import type { Hackathon } from "@/types";

export function generateGoogleCalendarUrl(hackathon: Hackathon): string {
  const startDate = new Date(hackathon.deadline);
  // Format: YYYYMMDDTHHMMSSZ
  const start = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  // End date is same day at 11:59 PM
  const endDate = new Date(hackathon.deadline);
  endDate.setHours(23, 59, 59);
  const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: hackathon.title,
    dates: `${start}/${end}`,
    details: `Prize Pool: ${hackathon.prize_pool}\n\n${hackathon.description}\n\nView on Devpost: ${hackathon.url}`,
    location: hackathon.location,
    ctz: "America/Los_Angeles",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICalEvent(hackathon: Hackathon): string {
  const startDate = new Date(hackathon.deadline);
  const start = startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const endDate = new Date(hackathon.deadline);
  endDate.setHours(23, 59, 59);
  const end = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const uid = `${hackathon.id}-${Date.now()}@aihacktracker.dev`;

  const ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AIHackTracker//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${start}
DTEND:${end}
SUMMARY:${hackathon.title}
DESCRIPTION:Prize Pool: ${hackathon.prize_pool}\\n\\n${hackathon.description}\\n\\nView: ${hackathon.url}
LOCATION:${hackathon.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  return ical;
}

export function downloadICalEvent(hackathon: Hackathon) {
  const ical = generateICalEvent(hackathon);
  const blob = new Blob([ical], { type: "text/calendar" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${hackathon.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
