import { NextResponse } from "next/server";
import { HACKATHONS } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  try {
    // If Supabase is configured, pull from DB; otherwise fall back to static data
    if (supabase) {
      let query = supabase.from("hackathons").select("*").order("deadline", { ascending: true });
      if (category && category !== "All") query = query.eq("category", category);
      if (status && status !== "All") query = query.eq("status", status);
      const { data, error } = await query;
      if (!error && data) return NextResponse.json({ hackathons: data });
    }

    // Static fallback
    let results = [...HACKATHONS];
    if (category && category !== "All") results = results.filter((h) => h.category === category);
    if (status && status !== "All") results = results.filter((h) => h.status === status);

    return NextResponse.json({ hackathons: results });
  } catch (err) {
    console.error("Hackathons API error:", err);
    return NextResponse.json({ hackathons: HACKATHONS }, { status: 200 });
  }
}
