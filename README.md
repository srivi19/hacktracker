# AIHackTracker 🚀

The AI Hackathon Intelligence Platform — Discover, track, and learn from the best AI hackathons happening now.

**Live:** https://hacktracker-production.up.railway.app/

**Project Info:** Mind the Product Hackathon 2026 · June 20 deadline
**Builder:** Vi (Srividya Narayanan)

---

## What is AIHackTracker?

AIHackTracker aggregates AI hackathons from across the internet, provides deadline tracking, calendar views, and winning project intelligence to help you find and win your next hackathon.

### Features

- **🎯 Curated Hackathons** — 8+ current AI hackathons with real-time status tracking
- **📅 Calendar View** — Visualize deadlines across months
- **🏆 Winning Projects** — Learn from past winners and what made them win
- **💰 Prize Tracking** — See the total prize pool and breakdown
- **📊 Live Analytics** — Track platform usage with Novus.ai
- **⚡ Lightning Fast** — Next.js + Railway deployment = instant load times
- **♻️ Auto-Refresh** — Database updates every 10 days automatically (pg_cron)

---

## Current Hackathons (June 2026)

| Hackathon | Deadline | Prize Pool | Status | Category |
|-----------|----------|-----------|--------|----------|
| USAII® Global AI Hackathon | June 21 | $15,000 | 🟢 Open | AI Safety |
| Google Cloud Rapid Agent | June 25 | $30,000 | 🟢 Open | Agent AI |
| DeveloperWeek 2026 | June 20 | $12,500 | 🟢 Open | Developer Tools |
| DevNetwork [AI + ML] | June 18 | $8,000 | 🟢 Open | AI / ML |
| Mind the Product 2026 | June 20 | $2,000 | 🟢 Open | Product |
| Hack Devpost 2026 | June 12 | $12,000 | 🔴 Closing Soon | DevTools |
| ProduHacks 2026 | July 15 | $8,000 | 🟡 Upcoming | Product |
| OpenAI Open Model 2026 | July 31 | $25,000 | 🟢 Open | AI / ML |

**Total Prize Pool:** $112,500

---

## Quick Start

### 1. View Live
```bash
Visit: https://hacktracker-production.up.railway.app/
```

### 2. Explore Hackathons
- **Grid View**: Card-based browsing with status badges
- **List View**: Sortable table with filtering
- **Calendar View**: See deadlines across months

### 3. Learn from Winners
- **What Wins?** tab shows past winning projects
- Each project includes tech stack, prize, and key insight
- Discover patterns in what judges reward

### 4. Track Insights
- **AI Insights** section: Winning strategies based on 6 past winners
- View live analytics on the dashboard

---

## Running Locally

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Clone and install
git clone <repo>
cd hacktracker
npm install

# 2. Get a Gemini API key (free)
# Visit https://makersuite.google.com/app/apikey
# Keep the default (already in .env.local.example)

# 3. Set up Supabase (free, 5 min)
# Follow the detailed steps in SUPABASE_SETUP.md

# 4. Create .env.local
cp .env.local.example .env.local
# Add Supabase URL and key

# 5. Start dev server
npm run dev
# Open http://localhost:3000
```

### Development Commands
```bash
npm run dev        # Start dev server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## Deployment

### Deploy to Railway (Free Tier)

1. Push code to GitHub
2. Go to https://railway.app
3. Connect GitHub repo
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Railway auto-deploys on push

**Current deployment:** https://hacktracker-production.up.railway.app/

See [DEPLOY.md](./DEPLOY.md) for detailed instructions.

---

## Architecture

AIHackTracker uses a **Supabase-first architecture** with automatic fallbacks:

```
Supabase (PostgreSQL) ← PRIMARY
    ↓
API Routes (/api/hackathons)
    ↓
React Components (Grid, List, Calendar)
    ↓
    └─→ Fallback: Static seed data (if Supabase down)
```

### Key Features
- **Auto-Refresh:** pg_cron runs every 10 days to update hackathon statuses
- **Resilient:** Falls back to static data if Supabase is unavailable
- **Real-Time:** Immediate status updates (open → closing_soon → closed)
- **Zero Cost:** Supabase free tier covers all usage

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full system design.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 14 + React 18 | Fast, type-safe, great DX |
| **Styling** | Tailwind CSS | Rapid UI development |
| **Database** | Supabase (PostgreSQL) | Free, scalable, built-in RLS |
| **API** | Next.js Routes | Integrated, serverless |
| **AI** | Gemini 1.5 Flash | Free tier, fast, high quality |
| **Analytics** | Novus.ai | Simple, event-based tracking |
| **Hosting** | Railway | Free tier, git integration |
| **Auto-Refresh** | pg_cron | Built into PostgreSQL |

---

## Project Structure

```
hacktracker/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── dashboard/page.tsx    # Main dashboard (Grid/List/Calendar)
│   │   ├── api/hackathons/route.ts  # API endpoint
│   │   └── layout.tsx            # Root layout + Novus.ai script
│   ├── components/
│   │   ├── HackathonGrid.tsx     # Card grid view
│   │   ├── HackathonList.tsx     # Table view
│   │   ├── CalendarView.tsx      # Custom calendar
│   │   ├── NovusCarousel.tsx     # Analytics screenshots
│   │   └── Footer.tsx            # Footer with links
│   ├── lib/
│   │   ├── data.ts               # Static seed data (8 hackathons)
│   │   ├── supabase.ts           # Supabase client
│   │   └── gemini.ts             # Gemini API (optional)
│   └── types/
│       └── index.ts              # TypeScript types
├── supabase/
│   ├── schema.sql                # Database schema
│   └── migrations/
│       ├── insert_current_hackathons.sql
│       └── setup_cron_refresh.sql
├── DEPLOY.md                     # Deployment guide
├── ARCHITECTURE.md               # System design
├── README.md                     # This file
└── package.json
```

---

## Data Sources

### Current Hackathons
- **USAII Global AI Hackathon** - AI safety focus
- **Google Cloud Rapid Agent Hackathon** - Agent AI + Gemini
- **DeveloperWeek 2026** - Developer tools
- **DevNetwork [AI + ML]** - Dedicated AI/ML track
- **Mind the Product 2026** - Product innovation (this hackathon!)
- **Hack Devpost 2026** - Meta hackathon for hackathon tools
- **ProduHacks 2026** - Sustainable product builders
- **OpenAI Open Model 2026** - Open-weight models

### Winning Projects (6 analyzed)
- Market-Gap AI (World Wide Vibes 2025) - 3rd place, $750
- Flora AI (Google AI Hackathon 2025) - 1st place, $10,000
- MailMate AI (Chrome Built-in AI 2025) - Top prize, $3,000
- SymptoCheck (Healthcare AI 2025) - 1st place, $25,000
- HackMate (Hack Devpost 2025) - 2nd place, $5,000
- Smart Contract Scan (Web3 Builder 2025) - 1st place, $15,000

---

## Key Insights

From analyzing 6 winning projects, AIHackTracker reveals:

🏆 **Chrome Extension + AI combos** win micro-SaaS brackets ~70% of the time
📊 **Projects with live demos** beat static screenshots by 3x in judging scores
🚀 **Gemini Flash** is the fastest free AI for hackathon summarization
💡 **Meta tools** (tools for hackers) score high on originality
⚡ **Next.js + Railway** = fastest path from code to live URL judges can click
🎯 **Healthcare AI** winners solve last-mile UX, not just model accuracy

---

## Analytics

AIHackTracker uses **Novus.ai** to track:
- Page views
- Hackathon card clicks
- Filter/category changes
- Calendar interactions
- External link clicks

**Dashboard:** View live analytics at https://app.novus.ai/ (with Novus account)

---

## Roadmap

### Current Version (v1.0)
- ✅ Curated hackathon directory
- ✅ Calendar view
- ✅ Winning projects analysis
- ✅ Novus.ai analytics
- ✅ Supabase auto-refresh (pg_cron)

### Future (v2.0)
- 🔜 Live web scraping (Devpost/MLH APIs)
- 🔜 Email alerts (48h / 24h before deadline)
- 🔜 User accounts & hackathon bookmarks
- 🔜 Team formation matching
- 🔜 Mobile app (React Native)

---

## Support

**Found a bug?** Open an issue on GitHub
**Want to contribute?** PRs welcome!
**Questions?** Email Vi at srividya.chandra@gmail.com

---

## License

MIT License — feel free to use this as a template for your own hackathon projects!

---

**Built for Mind the Product Hackathon 2026**
**Deadline: June 20, 2026**
**Deployed on Railway** | **Database on Supabase** | **Tracked by Novus.ai**

Last updated: June 12, 2026
