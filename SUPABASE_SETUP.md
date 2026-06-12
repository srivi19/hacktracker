# Supabase Setup Guide for AIHackTracker

## Overview

AIHackTracker uses Supabase (PostgreSQL) to store and manage hackathon data. The system is designed to:
- Fetch live data from Supabase as the primary source
- Auto-refresh hackathon data every 10 days using pg_cron
- Fall back to static seed data if Supabase is unavailable

## Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Create a new project
4. Wait for the project to initialize (2-3 minutes)

### 2. Set Up Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Create a new query
3. Copy the contents of `supabase/schema.sql`
4. Paste and run it

This creates:
- `public.hackathons` table (main data)
- `public.winners` table (past winners)
- `public.user_alerts` table (for future email alerts)
- Row-level security policies (public read access)

### 3. Insert Current Hackathon Data

1. Go to **SQL Editor** → **New Query**
2. Copy the contents of `supabase/migrations/insert_current_hackathons.sql`
3. Paste and run it

This inserts the 8 current hackathons with all details.

### 4. Set Up Auto-Refresh (pg_cron)

1. Go to **SQL Editor** → **New Query**
2. Copy the contents of `supabase/migrations/setup_cron_refresh.sql`
3. Paste and run it

This creates a cron job that:
- Runs every 10 days at 2 AM UTC
- Updates hackathon statuses (open → closing_soon → closed)
- Can be extended to call your scraper API

### 5. Configure Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Find these values in your Supabase dashboard:
- **Settings** → **API** → **Project URL**
- **Settings** → **API** → **anon (public)** key

### 6. Test the Setup

1. Deploy to Railway (as usual)
2. Visit `/api/hackathons` endpoint
3. Should see `"source": "supabase"` in the response
4. If not, check:
   - Environment variables are set in Railway dashboard
   - Schema was created successfully
   - Data was inserted correctly

## How It Works

**API Flow:**
```
Client Request
    ↓
API Route (/api/hackathons)
    ↓
Try Supabase First
    ↓
    ├─ Success → Return Supabase data + "source: supabase"
    └─ Fail → Fall back to static seed data + "source: static-fallback"
```

**Auto-Refresh:**
- pg_cron job runs every 10 days
- Updates status of hackathons based on deadline
- Can be extended to call external scraper API

## Monitoring

Check cron job status in Supabase:

```sql
SELECT * FROM cron.job;
SELECT * FROM cron.job_run_details;
```

## Future: Live Scraping

To add live scraping that updates Supabase every 10 days:

1. Create an `/api/scrape-and-sync` endpoint that:
   - Calls Devpost/MLH scrapers
   - Upserts results into `public.hackathons`
   - Returns count of updated hackathons

2. Update `setup_cron_refresh.sql` to call:
   ```sql
   SELECT cron.schedule('scrape-hackathons', '0 2 */10 * *', 
     'SELECT http_post(''https://yourapp.com/api/scrape-and-sync'')');
   ```

3. You'll need the `http` extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS http;
   ```

## Troubleshooting

**Supabase not returning data:**
- Check if tables were created: `SELECT * FROM hackathons LIMIT 1;`
- Check if data was inserted: `SELECT COUNT(*) FROM hackathons;`
- Check policies: `SELECT * FROM pg_policies;`

**pg_cron not running:**
- Verify extension is enabled: `CREATE EXTENSION IF NOT EXISTS pg_cron;`
- Check scheduled jobs: `SELECT * FROM cron.job;`

**API returning static fallback:**
- Check env vars in Railway dashboard
- Check Supabase connection: test in browser console
- Check API logs in Railway deployment logs

## Cost

**Supabase Free Tier covers this setup:**
- ✅ Unlimited API calls (within rate limits)
- ✅ 500MB storage (hackathon data is ~100KB)
- ✅ pg_cron included
- ✅ No cost for this use case

---

**Status**: Supabase is now your primary data source. Enjoy! 🚀
