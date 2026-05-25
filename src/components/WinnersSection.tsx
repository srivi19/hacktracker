import { Trophy, ExternalLink, Cpu } from "lucide-react";
import { WINNER_PROJECTS } from "@/lib/data";

export default function WinnersSection() {
  return (
    <section id="winners" className="mb-12">
      <div className="flex items-center gap-2 mb-2">
        <Trophy size={16} className="text-accent" />
        <h2 className="text-lg font-black text-navy tracking-tight">Winning Projects Intelligence</h2>
        <span className="chip-green text-[10px]">AI-analyzed</span>
      </div>
      <p className="text-xs text-slate-500 mb-5">
        Real past winners · what they built · why they won · patterns you can copy
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WINNER_PROJECTS.map((w) => (
          <div
            key={w.id}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 transition-all duration-200"
          >
            {/* Prize badge */}
            <div className="flex items-start justify-between mb-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                <Trophy size={9} fill="currentColor" /> {w.prize_won}
              </span>
              <span className="text-[10px] text-slate-400">{w.hackathon_year}</span>
            </div>

            {/* Project name */}
            <h3 className="font-bold text-navy text-sm mb-0.5">{w.project_name}</h3>
            <p className="text-[11px] text-slate-400 mb-2">{w.hackathon_title}</p>

            {/* Description */}
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">{w.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1 mb-3">
              {w.tech_stack.map((t) => (
                <span key={t} className="flex items-center gap-0.5 chip text-[10px]">
                  <Cpu size={8} /> {t}
                </span>
              ))}
            </div>

            {/* AI insight */}
            <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2 mb-3">
              <p className="text-[11px] text-green-800 leading-snug">{w.insight}</p>
            </div>

            {/* Link */}
            <a
              href={w.url ?? `https://devpost.com/software/${w.project_name.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-accent font-semibold hover:underline"
            >
              View project <ExternalLink size={10} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
