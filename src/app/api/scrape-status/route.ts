import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ last_scraped: null, last_count: 0, status: "no-db" });
  }
  const { data } = await supabase
    .from("scrape_meta")
    .select("last_scraped, last_count, status")
    .eq("id", 1)
    .single();

  return NextResponse.json(data ?? { last_scraped: null, last_count: 0, status: "idle" });
}
