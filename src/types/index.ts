export type HackathonStatus = "open" | "closing_soon" | "closed" | "upcoming";

export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  url: string;
  deadline: string; // ISO date string
  prize_pool: string;
  theme: string;
  tech_tags: string[];
  team_size: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  location: string;
  summary: string; // AI-generated one-liner
  description: string;
  status: HackathonStatus;
  category: string;
  participants?: number;
  featured?: boolean;
}

export interface WinnerProject {
  id: string;
  hackathon_title: string;
  hackathon_year: number;
  project_name: string;
  prize_won: string;
  tech_stack: string[];
  description: string;
  url?: string;
  insight: string; // AI pattern insight
}

export interface FilterState {
  search: string;
  category: string;
  difficulty: string;
  prizeMin: number;
  status: string;
  techTags: string[]; // Multi-select tech tags
  teamSize: string; // "solo" | "team" | "all"
  format: string; // "online" | "in-person" | "hybrid" | "all"
}
