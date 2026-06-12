import { NextResponse } from "next/server";
import { HACKATHONS } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");

  try {
    // PRIMARY: Try Supabase first
    if (supabase) {
      let query = supabase
        .from("hackathons")
        .select("*")
        .order("deadline", { ascending: true });

      if (category && category !== "All") query = query.eq("category", category);
      if (status && status !== "All") query = query.eq("status", status);

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        return NextResponse.json({
          hackathons: data,
          source: "supabase",
          count: data.length,
          lastUpdated: new Date().toISOString(),
        });
      }
    }

    // FALLBACK: Use static seed data only if Supabase fails
    console.warn("Supabase fetch failed or returned no data, falling back to static data");
    let results = [...HACKATHONS];
    if (category && category !== "All") results = results.filter((h) => h.category === category);
    if (status && status !== "All") results = results.filter((h) => h.status === status);

    return NextResponse.json({
      hackathons: results,
      source: "static-fallback",
      count: results.length,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Hackathons API error:", err);
    return NextResponse.json({
      hackathons: HACKATHONS,
      source: "static-fallback",
      error: "Failed to fetch from Supabase, using static data"
    });
  }
}
