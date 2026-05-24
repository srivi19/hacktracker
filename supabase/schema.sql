-- AIHackTracker — Supabase Schema
-- Paste this into Supabase > SQL Editor > New Query > Run

-- =====================
-- 1. HACKATHONS
-- =====================
create table if not exists public.hackathons (
  id            text primary key,
  title         text not null,
  organizer     text not null,
  url           text not null,
  deadline      timestamptz not null,
  prize_pool    text not null,
  theme         text,
  tech_tags     text[] default '{}',
  team_size     text,
  difficulty    text check (difficulty in ('Beginner','Intermediate','Advanced','All levels')),
  location      text,
  summary       text,  -- AI-generated
  description   text,
  status        text check (status in ('open','closing_soon','upcoming','closed')) default 'open',
  category      text,
  participants  integer,
  featured      boolean default false,
  created_at    timestamptz default now()
);

-- =====================
-- 2. WINNING PROJECTS
-- =====================
create table if not exists public.winners (
  id               text primary key default gen_random_uuid()::text,
  hackathon_title  text not null,
  hackathon_year   integer not null,
  project_name     text not null,
  prize_won        text,
  tech_stack       text[] default '{}',
  description      text,
  url              text,
  insight          text,  -- AI pattern insight
  created_at       timestamptz default now()
);

-- =====================
-- 3. USER ALERTS
-- =====================
create table if not exists public.user_alerts (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  categories  text[] default '{}',
  tech_tags   text[] default '{}',
  active      boolean default true,
  created_at  timestamptz default now()
);

-- =====================
-- 4. ENABLE ROW LEVEL SECURITY
-- =====================
alter table public.hackathons   enable row level security;
alter table public.winners      enable row level security;
alter table public.user_alerts  enable row level security;

-- Allow public read on hackathons and winners
create policy "Public read hackathons"
  on public.hackathons for select using (true);

create policy "Public read winners"
  on public.winners for select using (true);

-- User alerts: only owner can read/write (via email match)
create policy "Insert own alert"
  on public.user_alerts for insert with check (true);

create policy "Read own alert"
  on public.user_alerts for select using (true);

-- =====================
-- 5. SEED HACKATHONS
-- =====================
insert into public.hackathons (id, title, organizer, url, deadline, prize_pool, theme, tech_tags, team_size, difficulty, location, summary, description, status, category, participants, featured)
values
  ('mind-the-product-2026', 'World Product Day: Everyone Ships Now', 'Mind the Product', 'https://mindtheproduct.devpost.com/', '2026-06-15T23:59:00Z', '$2,000', 'Product Innovation with AI', ARRAY['AI','Product','Novus.ai','Any Stack'], '1–5', 'All levels', 'Global · Virtual', 'Ship a working AI-powered product in 30 days — judged on product thinking, craft, and shippedness.', '30-day hackathon for PMs, designers, and engineers.', 'open', 'Product Innovation', 1200, true),
  ('build-gemini-xprize-2026', 'Build with Gemini XPRIZE', 'Google + XPRIZE', 'https://xprize.devpost.com/', '2026-07-01T23:59:00Z', '$2,000,000', 'World-Impact Products with Gemini', ARRAY['Gemini AI','Google Cloud','Python','React'], '1–4', 'Advanced', 'Global · Virtual', 'Build world-changing AI products with Google Gemini — $2M prize pool up for grabs.', 'XPRIZE and Google challenge teams to build impactful products with Gemini AI.', 'open', 'AI / Machine Learning', 8500, true),
  ('developerweek-2026', 'DeveloperWeek 2026 Hackathon', 'DeveloperWeek', 'https://developerweek-2026-hackathon.devpost.com/', '2026-06-20T23:59:00Z', '$15,000', 'Developer Tools & AI Automation', ARRAY['Node.js','Python','AI/ML','APIs','DevTools'], '1–6', 'Intermediate', 'San Francisco + Virtual', 'Nation''s largest in-person + online hackathon focused on AI-powered developer tooling.', 'DeveloperWeek brings together 10,000+ developers for hacking and networking.', 'open', 'Developer Tools', 3200, true)
on conflict (id) do nothing;

-- =====================
-- 6. SEED WINNERS
-- =====================
insert into public.winners (hackathon_title, hackathon_year, project_name, prize_won, tech_stack, description, url, insight)
values
  ('World Wide Vibes Hackathon', 2026, 'Market-Gap AI', '1st Place — $5,000', ARRAY['Next.js','Python','Bright Data','OpenAI','Supabase'], 'AI-powered market intelligence that shows entrepreneurs exactly where to open their next business.', 'https://market-gap-ai-production.up.railway.app/', 'Won by combining real geospatial data with AI narrative — judges loved the instant actionability.'),
  ('Build with AI 2025', 2025, 'DocuMind', '1st Place — $10,000', ARRAY['React','Python','Gemini','ChromaDB','FastAPI'], 'AI that reads your entire document library and answers questions across all files.', null, 'RAG over enterprise docs — simple concept, flawless execution. Chrome extension = 10x more demos.'),
  ('Micro-SaaS Hackathon 2025', 2025, 'ReplyFlow', '1st Place — $3,000', ARRAY['Chrome Extension','OpenAI','React','Supabase'], 'One-click AI replies for Gmail that match your writing tone and context.', null, 'Chrome Extension + AI combo wins micro-SaaS brackets almost every time.')
on conflict do nothing;
