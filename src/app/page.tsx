import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HACKATHONS } from "@/lib/data";
import { Trophy, Zap, Bell, Search, Calendar, Users, ArrowRight, Play, CheckCircle2, Sparkles, Target, Rocket } from "lucide-react";

const STATS = [
  { label: "Active Hackathons", value: "21+" },
  { label: "Prize Pool", value: "$2M+" },
  { label: "Winning Projects", value: "50+" },
  { label: "AI Summaries", value: "100%" },
];

export default function HomePage() {
  const featured = HACKATHONS.filter((h) => h.featured);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors">
      <Header />

      <main className="flex-1">
        {/* ===== PREMIUM HERO SECTION ===== */}
        <section className="relative bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 pt-24 pb-32 sm:pt-40 sm:pb-48 overflow-hidden">
          {/* Subtle background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 dark:border-green-900 bg-green-50/80 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold mb-8 backdrop-blur animate-fadeInUp">
              <Sparkles size={16} />
              AI-Powered Hackathon Discovery
            </div>

            {/* Logo & Tagline - Premium Layout */}
            <div className="mb-8 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6">
                <span className="text-navy dark:text-white">HACK-</span>
                <span className="text-accent">TRACK</span>
                <span className="text-navy dark:text-white"> AI</span>
              </h1>
              <h2 className="text-4xl sm:text-5xl font-bold text-navy dark:text-white mb-6">
                Find Your Winning Hackathon
              </h2>
            </div>

            {/* Value Proposition - Concise */}
            <p className="text-xl sm:text-2xl text-slate-700 dark:text-slate-200 max-w-3xl mb-10 leading-relaxed font-medium animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              AI-summarized opportunities. Real winning patterns. Never miss a deadline.
            </p>

            {/* Strong CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Rocket size={20} /> Start Exploring
              </Link>
              <Link
                href="/dashboard?tab=insights"
                className="flex items-center gap-3 px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-navy dark:text-white font-bold text-lg rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Zap size={20} /> See Winning Patterns
              </Link>
            </div>

            {/* Trust Signal */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              <span>✓ Data from Devpost, MLH, AngelList</span>
              <span>✓ Updated live every 10 days</span>
              <span>✓ 50+ winners analyzed</span>
            </div>
          </div>
        </section>

        {/* ===== STATS BAR - PREMIUM ===== */}
        <section className="border-y border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-center">
            {STATS.map((s, i) => (
              <div key={s.label} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-4xl sm:text-5xl font-black text-navy dark:text-white mb-2">{s.value}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 uppercase tracking-widest font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SEE IT IN ACTION - DASHBOARD PREVIEW ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-navy dark:text-white mb-4">See It In Action</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">The complete hackathon discovery platform</p>
          </div>

          {/* Dashboard Preview Card - Premium */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow animate-fadeInUp">
            {/* Browser Header */}
            <div className="bg-slate-100 dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 text-center text-sm text-slate-500 dark:text-slate-400">
                hacktracker-production.up.railway.app/dashboard
              </div>
            </div>

            {/* Dashboard Content Preview */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8">
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-3 mb-8">
                  <div className="px-4 py-2 bg-accent text-white rounded-lg font-bold text-sm">Grid</div>
                  <div className="px-4 py-2 text-slate-400 font-bold text-sm">List</div>
                  <div className="px-4 py-2 text-slate-400 font-bold text-sm">Calendar</div>
                </div>

                {/* Filter Bar */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 space-y-3">
                  <div className="flex gap-2 flex-wrap">
                    <input type="text" placeholder="Search hackathons..." className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-700" />
                    <select className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:bg-slate-700">
                      <option>All Categories</option>
                    </select>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold">Python</span>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">React</span>
                    <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold">Web3</span>
                    <span className="text-xs text-slate-500">+15 more filters</span>
                  </div>
                </div>

                {/* Hackathon Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featured.slice(0, 2).map((h) => (
                    <div key={h.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-green-300 dark:hover:border-green-600 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Open</span>
                        <span className="text-sm font-black text-accent">{h.prize_pool}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{h.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-2">"{h.summary}"</p>
                      <div className="flex gap-1 mb-2">
                        {h.tech_tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 flex justify-between">
                        <span>📅 {new Date(h.deadline).toLocaleDateString()}</span>
                        <span>👥 {h.team_size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Below Preview */}
          <div className="text-center mt-12 animate-fadeInUp">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-green-600 text-white font-bold rounded-lg transition-colors shadow-lg">
              <Play size={18} /> Explore Full Dashboard
            </Link>
          </div>
        </section>

        {/* ===== HOW IT WORKS - VISUAL ===== */}
        <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-navy dark:text-white mb-4">How It Works</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">Three simple steps to your next winning hackathon</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  num: 1,
                  icon: Search,
                  title: "Browse & Filter",
                  features: ["21+ hackathons", "Filter by deadline, prize, tech", "Sort by what's open now"]
                },
                {
                  num: 2,
                  icon: Sparkles,
                  title: "Read AI Summaries",
                  features: ["Gemini reads each page", "One-liner summaries", "Instant value judgment"]
                },
                {
                  num: 3,
                  icon: Trophy,
                  title: "See What Wins",
                  features: ["50+ winning projects", "Real tech stacks", "Judge patterns revealed"]
                }
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative animate-fadeInUp" style={{ animationDelay: `${i * 0.15}s` }}>
                    {/* Number Badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-accent to-green-600 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                      {step.num}
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 h-full hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all">
                      <Icon className="w-12 h-12 text-accent mb-6" />
                      <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{step.title}</h3>
                      <ul className="space-y-3">
                        {step.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                            <CheckCircle2 size={18} className="text-accent flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== FEATURED HACKATHONS - PREMIUM ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-navy dark:text-white mb-3">Open Right Now</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">Hackathons with open applications</p>
            </div>
            <Link href="/dashboard" className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((h, i) => (
              <a
                key={h.id}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-green-300 dark:hover:border-green-600 hover:shadow-2xl transition-all animate-fadeInUp hover:-translate-y-2"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`inline-block text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide status-${h.status}`}>
                    {h.status === "closing_soon" ? "⏰ Closing Soon" : "🟢 Open"}
                  </span>
                  <span className="text-2xl font-black text-accent">{h.prize_pool}</span>
                </div>

                <h3 className="text-xl font-bold text-navy dark:text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {h.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">{h.summary}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {h.tech_tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-block text-xs bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} /> {new Date(h.deadline).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} /> {h.team_size}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ===== FEATURES - VISUAL CARDS ===== */}
        <section className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black text-navy dark:text-white mb-4">Why Builders Choose AIHackTracker</h2>
              <p className="text-xl text-slate-600 dark:text-slate-300">Everything you need to win</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Search, title: "Smart Search & Filter", desc: "Find hackathons matching your tech stack, deadline, and prize in seconds" },
                { icon: Zap, title: "AI-Powered Summaries", desc: "Gemini reads the fine print. You get the key facts instantly" },
                { icon: Trophy, title: "Winning Patterns", desc: "See what past winners built. Learn what judges actually reward" },
                { icon: Bell, title: "Smart Alerts", desc: "Bookmark hackathons. Get real-time deadline reminders" },
                { icon: Target, title: "Prize Pool Tracker", desc: "$2M+ in opportunities tracked. Find the best rewards" },
                { icon: Rocket, title: "Global Reach", desc: "Hackathons from North America, Europe, Asia, and beyond" }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="relative bg-gradient-to-br from-navy to-slate-800 dark:from-slate-900 dark:to-slate-950 py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">Start Winning Today</h2>
            <p className="text-xl text-slate-200 mb-10 leading-relaxed">
              Join builders who've already found their next winning hackathon with AIHackTracker. No sign-up required.
            </p>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-lg transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1"
            >
              <Rocket size={22} /> Explore Hackathons Now
            </Link>

            <p className="text-sm text-slate-400 mt-8">
              No credit card. No sign-up. Browse instantly.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
