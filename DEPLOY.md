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

## 3. Set up Supabase (5 min)

1. Go to https://supabase.com and create a free project
2. Go to **SQL Editor** → **New Query**
3. Paste the contents of `supabase/schema.sql` → click **Run**
4. Go to **Project Settings → API**
5. Copy **Project URL** and **anon key** into `.env.local`

## 4. Run locally

```bash
npm run dev
# Open http://localhost:3000
```

## 5. Deploy to Vercel (free, 2 min)

```bash
npm install -g vercel
vercel
# Follow prompts — select the hacktracker folder
# Add environment variables when prompted (or in Vercel dashboard)
```

Or push to GitHub and connect via https://vercel.com/new

**Add these env vars in Vercel dashboard:**
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

- [ ] Live URL deployed on Vercel
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
| Hosting | Vercel |
| Email Alerts | Resend (optional) |
