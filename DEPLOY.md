# AIHackTracker — Deploy Guide

Built by Vi (Srividya Narayanan) for Mind the Product Hackathon · World Product Day 2026

---

## 1. Install dependencies

```bash
cd hacktracker
npm install
```

## 2. Set up environment variables

```bash
cp .env.local.example .env.local
# Fill in your Gemini API key (already set) and Supabase keys
```

## 3. Set up Supabase (10 min, includes auto-refresh)

### Step A: Create project
1. Go to https://supabase.com and create a free project
2. Wait for project to initialize (2-3 minutes)

### Step B: Create schema
1. Go to **SQL Editor** → **New Query**
2. Copy contents of `supabase/schema.sql` and **Run**

### Step C: Insert hackathon data
1. Go to **SQL Editor** → **New Query**
2. Copy contents of `supabase/migrations/insert_current_hackathons.sql` and **Run**

### Step D: Set up auto-refresh (every 10 days)
1. Go to **SQL Editor** → **New Query**
2. Copy contents of `supabase/migrations/setup_cron_refresh.sql` and **Run**
   - This enables pg_cron and schedules daily status updates
   - Automatically marks hackathons as closing_soon, open, or closed based on deadline

### Step E: Get credentials
1. Go to **Project Settings → API**
2. Copy **Project URL** and **anon key** into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

## 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

## 5. Deploy to Railway (free, 2 min)

```bash
# Push to GitHub, then connect via https://railway.app
# Railway will auto-deploy on push
```

**Add these env vars in Railway dashboard:**
- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 6. Install Novus.ai (REQUIRED for submission)

1. Go to https://novus.ai
2. Create account and get your tracking snippet
3. Add it to `src/app/layout.tsx` inside the `<head>` tag
4. Verify it shows up in your Novus dashboard
5. Screenshot the dashboard → include in your Devpost submission

## 7. Submission checklist

- [ ] Live URL deployed on Railway
- [ ] Novus.ai installed + screenshot of dashboard
- [ ] 2–3 min demo video (YouTube/Loom)
- [ ] Short written description on Devpost
- [ ] Tag @Mind the Product on LinkedIn

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + React 18 |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| AI Summaries | Gemini 1.5 Flash |
| Hosting | Railway |
| Email Alerts | Resend (optional) |
