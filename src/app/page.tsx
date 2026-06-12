import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HACKATHONS, AI_INSIGHTS } from "@/lib/data";
import { Trophy, Zap, Bell, Search, Calendar, Users, ArrowRight, Play, Code2, Rocket, Brain, Target } from "lucide-react";

const FEATURE_TAGS = [
  "AI Summaries", "Deadline Tracker", "Prize Pool Filter",
  "Winning Patterns", "Team Finder", "Smart Alerts",
  "Calendar View", "Beginner-Friendly", "Web3 + AI",
  "Healthcare AI", "Micro-SaaS", "No-Code Tools",
];

const STATS = [
  { label: "Active Hackathons", value: "21+" },
  { label: "Prize Pool Tracked", value: "$2M+" },
  { label: "Winning Projects", value: "50+" },
  { label: "AI Summaries", value: "100%" },
];

export default function HomePage() {
  const featured = HACKATHONS.filter((h) => h.featured);

  return (
    <div className="min-h-screen flex flex-col dot-grid-bg">
      <Header />

      {/* Hero */}
      <main className="flex-1">
        <section className="relative hero-gradient overflow-hidden">
          {/* Animated floating elements */}
          <div className="absolute top-20 left-10 opacity-40 animate-bounce" style={{ animationDelay: "0s" }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-green-200 flex items-center justify-center text-white shadow-lg">
              <Code2 size={32} />
            </div>
          </div>
          <div className="absolute top-40 right-10 opacity-40 animate-bounce" style={{ animationDelay: "1s" }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-200 flex items-center justify-center text-white shadow-lg">
              <Brain size={32} />
            </div>
          </div>
          <div className="absolute bottom-20 left-20 opacity-40 animate-bounce" style={{ animationDelay: "2s" }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-purple-200 flex items-center justify-center text-white shadow-lg">
              <Rocket size={32} />
            </div>
          </div>
          <div className="absolute bottom-40 right-20 opacity-40 animate-bounce" style={{ animationDelay: "1.5s" }}>
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-orange-200 flex items-center justify-center text-white shadow-lg">
              <Target size={32} />
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center relative z-10">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-semibold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              21 hackathons tracked right now
            </div>

            {/* Main title — matching Market Gap AI large bold style */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
              <span className="text-navy">HACK-</span>
              <span className="text-accent">TRACK</span>
              <span className="text-navy"> AI</span>
            </h1>

            {/* Subtitle — italic like Market Gap AI */}
            <p className="text-lg sm:text-xl text-slate-500 italic font-light max-w-2xl mx-auto mb-3">
              One hub for every AI hackathon. Know what&apos;s open,
              <br className="hidden sm:block" /> what wins, and never miss a deadline again.
            </p>

            <p className="text-xs text-slate-400 mb-8">
              Powered by Devpost · Gemini AI · Real-time deadline tracking.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto">
              {FEATURE_TAGS.map((tag) => (
                <span key={tag} className="chip text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs — matching Market Gap AI button style */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-dark text-white font-bold text-sm tracking-wider uppercase rounded-lg transition-colors shadow-lg shadow-green-200"
              >
                EXPLORE HACKATHONS <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard?tab=insights"
                className="flex items-center gap-2 px-8 py-3 border-2 border-accent bg-accent text-white font-bold text-sm tracking-wide rounded-lg hover:bg-accent-dark hover:border-accent-dark transition-all shadow-lg shadow-green-200"
              >
                <Play size={14} /> WHAT WINS?
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-y border-slate-200 bg-white/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <div key={s.label} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-2xl sm:text-3xl font-black text-navy hover:text-accent transition-colors">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Hackathons */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-navy tracking-tight">Featured Hackathons</h2>
              <p className="text-slate-500 text-sm mt-1">AI-summarized, deadline-sorted, prize-filtered</p>
            </div>
            <Link
              href="/dashboard"
              className="text-sm text-accent font-semibold flex items-center gap-1 hover:underline"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((h, i) => (
              <a
                key={h.id}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hack-card group animate-fadeInUp"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide status-${h.status}`}>
                    {h.status === "closing_soon" ? "Closing Soon" : h.status}
                  </span>
                  <span className="text-xs font-bold text-accent">{h.prize_pool}</span>
                </div>

                <h3 className="font-bold text-navy text-sm leading-snug mb-2 group-hover:text-accent transition-colors">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-500 italic mb-3">&quot;{h.summary}&quot;</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {h.tech_tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip-green text-[10px]">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {new Date(h.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {h.team_size}
                  </span>
                  <span>{h.location}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-navy tracking-tight mb-2">
              🌍 Hackathons from Around the World
            </h2>
            <p className="text-slate-500 text-sm">Opportunities across North America, Europe, Asia, and beyond</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Animated Globe/World Map */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                {/* Animated globe background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 shadow-xl animate-float" style={{ animationDuration: "6s" }}>
                  {/* Continents representation - simplified */}
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="95" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.3" />
                    <circle cx="100" cy="100" r="85" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.2" />

                    {/* North America */}
                    <circle cx="50" cy="60" r="12" fill="#16a34a" opacity="0.8" />
                    {/* South America */}
                    <circle cx="60" cy="120" r="8" fill="#16a34a" opacity="0.7" />
                    {/* Europe */}
                    <circle cx="100" cy="50" r="10" fill="#16a34a" opacity="0.8" />
                    {/* Asia */}
                    <circle cx="130" cy="70" r="14" fill="#16a34a" opacity="0.8" />
                    {/* Africa */}
                    <circle cx="110" cy="100" r="9" fill="#16a34a" opacity="0.7" />
                    {/* Australia */}
                    <circle cx="140" cy="130" r="7" fill="#16a34a" opacity="0.7" />
                  </svg>
                </div>

                {/* Animated location pins */}
                <div className="absolute top-12 left-12 animate-bounce" style={{ animationDelay: "0s" }}>
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                </div>
                <div className="absolute top-20 right-16 animate-bounce" style={{ animationDelay: "0.5s" }}>
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                </div>
                <div className="absolute bottom-24 left-20 animate-bounce" style={{ animationDelay: "1s" }}>
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                </div>
                <div className="absolute bottom-12 right-12 animate-bounce" style={{ animationDelay: "1.5s" }}>
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
                </div>
              </div>
            </div>

            {/* Right: Location stats */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 animate-fadeInUp hover:shadow-lg transition-shadow" style={{ animationDelay: "0s" }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🇺🇸</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-sm">North America</h3>
                    <p className="text-xs text-slate-600">8+ hackathons • Google, Meta, OpenAI, Anthropic</p>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5 animate-fadeInUp hover:shadow-lg transition-shadow" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🇪🇺</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-sm">Europe</h3>
                    <p className="text-xs text-slate-600">5+ hackathons • Stanford, Tech conferences</p>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "25%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5 animate-fadeInUp hover:shadow-lg transition-shadow" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌏</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-sm">Asia Pacific</h3>
                    <p className="text-xs text-slate-600">4+ hackathons • AI innovation hub</p>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-xl p-5 animate-fadeInUp hover:shadow-lg transition-shadow" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🌐</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-sm">Global · Virtual</h3>
                    <p className="text-xs text-slate-600">4+ fully remote • Open to everyone worldwide</p>
                    <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "20%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Insights strip */}
        <section className="border-y border-slate-200 bg-navy/[0.02] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={16} className="text-accent" />
              <h2 className="text-sm font-black text-navy uppercase tracking-widest">
                Winning Intelligence
              </h2>
              <span className="chip-green text-[10px]">Gemini-powered</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AI_INSIGHTS.map((insight, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-xs text-slate-700 hover:border-green-300 hover:shadow-lg transition-all animate-fadeInUp"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-navy tracking-tight mb-2">
              Why Builders Use AIHackTracker
            </h2>
            <p className="text-slate-500 text-sm">Saves 5+ hours of searching. Gives you the edge.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Search size={20} />,
                title: "Aggregated Discovery",
                desc: "All hackathons from Devpost, MLH, AngelList in one place. Stop tab-switching.",
              },
              {
                icon: <Zap size={20} />,
                title: "AI Summaries",
                desc: "Gemini Flash reads every hackathon page and gives you a one-liner. No fluff.",
              },
              {
                icon: <Trophy size={20} />,
                title: "Winners Intelligence",
                desc: "See what past winners built, what tech they used, and why they won.",
              },
              {
                icon: <Bell size={20} />,
                title: "Deadline Alerts",
                desc: "48-hour email warnings for hackathons you starred. Never miss a deadline again.",
              },
            ].map((f, i) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-green-300 hover:shadow-lg transition-all animate-fadeInUp group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-accent mb-3 group-hover:bg-green-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-navy text-sm mb-1 group-hover:text-accent transition-colors">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
