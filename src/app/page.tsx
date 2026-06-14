import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HACKATHONS, AI_INSIGHTS } from "@/lib/data";
import { Trophy, Zap, Bell, Search, Calendar, Users, ArrowRight, Play, CheckCircle2 } from "lucide-react";

const STATS = [
  { label: "Active Hackathons", value: "21+" },
  { label: "Prize Pool Tracked", value: "$2M+" },
  { label: "Winning Projects", value: "50+" },
  { label: "AI Summaries", value: "100%" },
];

export default function HomePage() {
  const featured = HACKATHONS.filter((h) => h.featured);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />

      <main className="flex-1">
        {/* ===== HERO SECTION - CLEAN & PROFESSIONAL ===== */}
        <section className="relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-semibold mb-8 animate-fadeInUp">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real data from 21+ hackathons
            </div>

            {/* Main Logo/Brand */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              <span className="text-navy dark:text-white">HACK-</span>
              <span className="text-accent">TRACK</span>
              <span className="text-navy dark:text-white"> AI</span>
            </h1>

            {/* Tagline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy dark:text-white mb-6 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
              Find Your Winning Hackathon
            </h2>

            {/* Subheadline - Clear Value Prop */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              Discover AI-summarized hackathons, see what judges reward, and never miss a deadline. All in one place.
            </p>

            {/* Primary CTAs - Clean & Clear */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-green-600 text-white font-bold text-base rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Explore Hackathons <ArrowRight size={18} />
              </Link>
              <Link
                href="/dashboard?tab=insights"
                className="flex items-center gap-2 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-navy dark:text-white font-bold text-base rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Zap size={18} /> What Wins?
              </Link>
            </div>

            {/* Trust Signal */}
            <div className="text-sm text-slate-500 dark:text-slate-400 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              Data from <span className="font-semibold">Devpost · MLH · AngelList</span>
            </div>
          </div>
        </section>

        {/* ===== STATS BAR ===== */}
        <section className="border-y border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map((s, i) => (
              <div key={s.label} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-3xl sm:text-4xl font-black text-navy dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 uppercase tracking-widest font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== HOW IT WORKS - VISUAL DEMO ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">Three steps to find your next winning hackathon</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Browse & Filter",
                desc: "Explore 21+ hackathons filtered by deadline, prize, tech stack, and difficulty. Find what's open and what's closing soon.",
                icon: "🔍"
              },
              {
                num: "02",
                title: "Read AI Summaries",
                desc: "Gemini AI reads every hackathon page and writes a one-liner. No fluff, just value. Know instantly if it's for you.",
                icon: "✨"
              },
              {
                num: "03",
                title: "See What Wins",
                desc: "View 50+ past winning projects. See what judges reward. Learn the patterns. Build better and win.",
                icon: "🏆"
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all animate-fadeInUp"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-5xl font-black text-green-200 dark:text-green-900/40 mb-4">{step.num}</div>
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-navy dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FEATURED HACKATHONS ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white">Featured Opportunities</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mt-2">Curated hackathons open right now</p>
            </div>
            <Link
              href="/dashboard"
              className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((h, i) => (
              <a
                key={h.id}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all animate-fadeInUp"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide status-${h.status}`}>
                    {h.status === "closing_soon" ? "Closing Soon" : h.status === "open" ? "Open" : h.status}
                  </span>
                  <span className="text-lg font-black text-accent">{h.prize_pool}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-navy dark:text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {h.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{h.summary}</p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {h.tech_tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="inline-block text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                  {h.tech_tags.length > 2 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-1">
                      +{h.tech_tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {new Date(h.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {h.team_size}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== WHY HACKTRACKER ===== */}
        <section className="bg-slate-50 dark:bg-slate-800/50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-navy dark:text-white mb-4">Why Builders Use AIHackTracker</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Everything you need to find the right hackathon</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Search size={24} className="text-accent" />,
                  title: "One Dashboard",
                  desc: "All hackathons from Devpost, MLH, AngelList in one place. Stop tab-switching.",
                },
                {
                  icon: <Zap size={24} className="text-accent" />,
                  title: "AI-Powered Summaries",
                  desc: "Gemini reads every page for you. Get to the point in seconds.",
                },
                {
                  icon: <Trophy size={24} className="text-accent" />,
                  title: "Winning Patterns",
                  desc: "See what past winners built and what judges actually reward.",
                },
                {
                  icon: <Bell size={24} className="text-accent" />,
                  title: "Never Miss a Deadline",
                  desc: "Bookmark hackathons and get real-time reminders.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WINNING INTELLIGENCE TEASER ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="bg-gradient-to-br from-green-50 dark:from-green-900/20 to-blue-50 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-8 sm:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Zap className="text-accent flex-shrink-0 mt-1" size={28} />
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-navy dark:text-white mb-3">Winning Intelligence</h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">
                  Real patterns from 50+ hackathon winners. See what tech stacks, team sizes, and ideas actually win.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "✓ Most winning tech stack: React + Node.js",
                    "✓ Ideal team size: 2-3 people",
                    "✓ Fastest to ship: Next.js + Railway",
                    "✓ Highest engagement: Healthcare + AI"
                  ].map((insight, i) => (
                    <div key={i} className="flex items-center gap-2 text-navy dark:text-white font-semibold">
                      <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                      {insight}
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard?tab=insights"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
                >
                  <Zap size={18} /> View Winning Patterns
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="bg-gradient-to-br from-navy to-slate-800 dark:from-slate-900 dark:to-slate-950 py-20 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-black mb-6">Ready to Find Your Hackathon?</h2>
            <p className="text-lg text-slate-200 mb-10">Join 100+ builders who use AIHackTracker to discover their next winning hackathon.</p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent hover:bg-green-600 text-white font-bold text-lg rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Start Exploring <ArrowRight size={20} />
            </Link>

            <p className="text-sm text-slate-400 mt-8">
              No sign-up required. Browse instantly.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
