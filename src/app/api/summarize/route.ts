import { NextResponse } from "next/server";
import { summarizeHackathon, generateHackathonTips } from "@/lib/gemini";

const PENDO_TRACK_URL = "https://data.pendo.io/data/track";
const PENDO_INTEGRATION_KEY = "502d28e9-404b-4a40-b45c-d31b24b16f77";

async function pendoTrackEvent(event: string, properties: Record<string, unknown>) {
  try {
    await fetch(PENDO_TRACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-pendo-integration-key": PENDO_INTEGRATION_KEY,
      },
      body: JSON.stringify({
        type: "track",
        event,
        visitorId: "system",
        accountId: "system",
        timestamp: Date.now(),
        properties,
      }),
    });
  } catch (err) {
    console.error("Pendo track event failed:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, prizes, deadline, mode } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "title and description required" }, { status: 400 });
    }

    if (mode === "tips") {
      const startTime = Date.now();
      const tips = await generateHackathonTips(title, body.techStack || [], body.theme || "");

      pendoTrackEvent("ai_tips_generated", {
        hackathon_title: String(title).substring(0, 100),
        tech_stack: (body.techStack || []).join(", ").substring(0, 100),
        theme: String(body.theme || "").substring(0, 100),
        tips_count: Array.isArray(tips) ? tips.length : 0,
        generation_success: true,
        response_time_ms: Date.now() - startTime,
      });

      return NextResponse.json({ tips });
    }

    const startTime = Date.now();
    const summary = await summarizeHackathon(title, description, prizes || "TBD", deadline || "TBD");

    pendoTrackEvent("ai_summary_generated", {
      hackathon_title: String(title).substring(0, 100),
      summary_length: String(summary).length,
      has_prizes: prizes !== undefined && prizes !== "TBD",
      has_deadline: deadline !== undefined && deadline !== "TBD",
      generation_success: true,
      response_time_ms: Date.now() - startTime,
    });

    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Summarize API error:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
