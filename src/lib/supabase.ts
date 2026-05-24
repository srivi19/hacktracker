import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Returns null if env vars not yet set (during local dev before Supabase setup)
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export type Database = {
  public: {
    Tables: {
      hackathons: {
        Row: {
          id: string;
          title: string;
          organizer: string;
          url: string;
          deadline: string;
          prize_pool: string;
          theme: string;
          tech_tags: string[];
          team_size: string;
          difficulty: string;
          location: string;
          summary: string;
          description: string;
          status: string;
          category: string;
          participants: number | null;
          featured: boolean;
          created_at: string;
        };
      };
      winners: {
        Row: {
          id: string;
          hackathon_title: string;
          hackathon_year: number;
          project_name: string;
          prize_won: string;
          tech_stack: string[];
          description: string;
          url: string | null;
          insight: string;
          created_at: string;
        };
      };
      user_alerts: {
        Row: {
          id: string;
          email: string;
          categories: string[];
          tech_tags: string[];
          active: boolean;
          created_at: string;
        };
      };
    };
  };
};
