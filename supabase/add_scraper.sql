-- Run this in Supabase > SQL Editor > New Query
-- Adds scraper support to existing schema

-- Add scraped_at to hackathons table
alter table public.hackathons
  add column if not exists scraped_at timestamptz,
  add column if not exists source text default 'manual',
  add column if not exists devpost_id text;

-- Scrape metadata table (tracks last run)
create table if not exists public.scrape_meta (
  id          integer primary key default 1,  -- singleton row
  last_scraped timestamptz,
  last_count   integer default 0,
  status       text default 'idle'
);

-- Insert singleton row
insert into public.scrape_meta (id, last_scraped, status)
values (1, null, 'idle')
on conflict (id) do nothing;

-- Allow public read on scrape_meta
alter table public.scrape_meta enable row level security;
create policy "Public read scrape_meta"
  on public.scrape_meta for select using (true);

create policy "Service update scrape_meta"
  on public.scrape_meta for update using (true);
