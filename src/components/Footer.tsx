import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-auto dark:border-slate-700 dark:bg-slate-900">
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
            <Image
              src="/Vee-Photo.png"
              alt="Vi (Srividya Narayanan)"
              width={28}
              height={28}
              className="rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p className="text-xs font-bold text-accent leading-tight">
                VI (SRIVIDYA NARAYANAN)
              </p>
              <p className="text-[10px] text-slate-500">AIHackTracker</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center">
        <p className="text-[10px] text-slate-400 mb-3">
          Built with Next.js · Gemini AI · Supabase · Deployed on Railway
        </p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">📊 Tracked by</span>
          <span className="inline-block px-2 py-1 bg-blue-50 border border-blue-200 rounded text-[10px] font-bold text-blue-700">
            NOVUS.AI
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 text-[9px] text-slate-500 flex-wrap">
          <a href="#about" className="hover:text-accent transition-colors group relative" title="Learn about AIHackTracker">
            About
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Discover winning hackathons
            </span>
          </a>
          <span>·</span>
          <a href="#privacy" className="hover:text-accent transition-colors group relative" title="Privacy policy">
            Privacy
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              We protect your data
            </span>
          </a>
          <span>·</span>
          <a href="#terms" className="hover:text-accent transition-colors group relative" title="Terms of service">
            Terms
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Platform guidelines
            </span>
          </a>
          <span>·</span>
          <a href="mailto:srividya.chandra@gmail.com" className="hover:text-accent transition-colors group relative" title="Get in touch">
            Contact
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-700 text-white rounded text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Questions? Let&apos;s talk
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
