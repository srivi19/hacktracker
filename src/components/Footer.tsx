export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-auto">
      {/* Metadata bar — identical style to Market Gap AI bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">

        <div>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Challenge Category
          </p>
          <p className="text-sm font-bold text-navy">
            PRODUCT INNOVATION
          </p>
        </div>

        <div>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Judging Criteria
          </p>
          <p className="text-xs font-semibold text-accent">
            PRODUCT THINKING · CRAFT · ORIGINALITY · SHIPPEDNESS
          </p>
        </div>

        <div>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Data Sources
          </p>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-semibold text-navy">DEVPOST API</p>
            <p className="text-xs font-semibold text-blue-600">GEMINI 1.5 FLASH</p>
          </div>
        </div>

        <div>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Hackathon
          </p>
          <p className="text-xs font-semibold text-navy">MIND THE PRODUCT</p>
          <p className="text-[10px] text-slate-500">World Product Day 2026</p>
        </div>

        <div>
          <p className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mb-1">
            Builder
          </p>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
              VI
            </div>
            <div>
              <p className="text-xs font-bold text-accent leading-tight">
                VI (SRIVIDYA NARAYANAN)
              </p>
              <p className="text-[10px] text-slate-500">AIHackTracker</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-3 text-center">
        <p className="text-[10px] text-slate-400">
          Built with Next.js · Gemini AI · Supabase · Deployed on Vercel
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">📊 Tracked by</span>
          <span className="inline-block px-2 py-1 bg-blue-50 border border-blue-200 rounded text-[10px] font-bold text-blue-700">
            NOVUS.AI
          </span>
        </div>
      </div>
    </footer>
  );
}
