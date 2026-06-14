"use client";
import { Zap, TrendingUp, Users, Trophy, Zap as ZapIcon } from "lucide-react";
import type { Hackathon } from "@/types";

interface Props {
  hackathons: Hackathon[];
}

export default function AIInsightsSection({ hackathons }: Props) {
  // Calculate insights
  const totalHackathons = hackathons.length;

  // Tech stack frequency
  const techFrequency: Record<string, number> = {};
  hackathons.forEach(h => {
    h.tech_tags.forEach(tag => {
      techFrequency[tag] = (techFrequency[tag] || 0) + 1;
    });
  });
  const topTechStack = Object.entries(techFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tech]) => tech);

  // Prize pool analysis
  const parsePrize = (prizeStr: string): number => {
    const match = prizeStr.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };
  const prizeAmounts = hackathons.map(h => parsePrize(h.prize_pool)).filter(p => p > 0);
  const avgPrize = prizeAmounts.length > 0
    ? Math.round(prizeAmounts.reduce((a, b) => a + b, 0) / prizeAmounts.length / 1000) * 1000
    : 0;
  const maxPrize = prizeAmounts.length > 0 ? Math.max(...prizeAmounts) : 0;

  // Category distribution
  const categoryCount: Record<string, number> = {};
  hackathons.forEach(h => {
    categoryCount[h.category] = (categoryCount[h.category] || 0) + 1;
  });
  const topCategory = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])[0];

  // Status distribution
  const openCount = hackathons.filter(h => h.status === 'open' || h.status === 'closing_soon').length;
  const openPercentage = totalHackathons > 0 ? Math.round((openCount / totalHackathons) * 100) : 0;

  // Location format
  const onlineCount = hackathons.filter(h =>
    h.location.toLowerCase().includes('virtual') ||
    h.location.toLowerCase().includes('online')
  ).length;
  const onlinePercentage = totalHackathons > 0 ? Math.round((onlineCount / totalHackathons) * 100) : 0;

  const insights = [
    {
      title: "Top Tech Stacks",
      value: topTechStack.join(" · "),
      icon: "⚡",
      description: "Most hackathons feature these technologies"
    },
    {
      title: "Average Prize Pool",
      value: `$${(avgPrize / 1000).toFixed(0)}K`,
      icon: "🏆",
      description: `Across ${prizeAmounts.length} hackathons`
    },
    {
      title: "Open & Closing Soon",
      value: `${openPercentage}%`,
      icon: "📈",
      description: `${openCount} of ${totalHackathons} hackathons`
    },
    {
      title: "Top Category",
      value: topCategory?.[0] || "N/A",
      icon: "🎯",
      description: `${topCategory?.[1] || 0} hackathons in this category`
    },
    {
      title: "Online Opportunities",
      value: `${onlinePercentage}%`,
      icon: "💻",
      description: `${onlineCount} hackathons online or hybrid`
    },
    {
      title: "Prize Range",
      value: `Up to $${(maxPrize / 1000).toFixed(0)}K`,
      icon: "💰",
      description: "Maximum prize pool in our database"
    }
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <ZapIcon size={16} className="text-accent" />
        <h2 className="text-lg font-black text-navy dark:text-white tracking-tight">AI-Powered Hackathon Insights</h2>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
        Real-time trends from {totalHackathons}+ hackathons · Updated every sync
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                {insight.title}
              </p>
              <span className="text-lg">{insight.icon}</span>
            </div>

            <p className="text-2xl font-black text-navy dark:text-white mb-1">
              {insight.value}
            </p>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {/* Key Findings */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-800 border border-green-200 dark:border-slate-700 rounded-xl p-5">
        <h3 className="font-bold text-navy dark:text-white text-sm mb-3">🔍 Key Findings</h3>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li>✓ <span className="font-semibold">{topTechStack.join(", ")}</span> dominate the hackathon landscape</li>
          <li>✓ <span className="font-semibold">{openPercentage}% of opportunities</span> are still open or closing soon</li>
          <li>✓ Average prize pools around <span className="font-semibold">${(avgPrize / 1000).toFixed(0)}K</span> attract competitive developers</li>
          <li>✓ <span className="font-semibold">{onlinePercentage}% are fully remote</span> — participate from anywhere</li>
        </ul>
      </div>
    </section>
  );
}
