import { NextResponse } from "next/server";
import { summarizeHackathon, generateHackathonTips } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, prizes, deadline, mode } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "title and description required" }, { status: 400 });
    }

    if (mode === "tips") {
      const tips = await generateHackathonTips(title, body.techStack || [], body.theme || "");
      return NextResponse.json({ tips });
    }

    const summary = await summarizeHackathon(title, description, prizes || "TBD", deadline || "TBD");
    return NextResponse.json({ summary });
  } catch (err) {
    console.error("Summarize API error:", err);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
