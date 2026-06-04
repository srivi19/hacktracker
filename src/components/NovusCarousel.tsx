"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";

interface Props {
  screenshots: string[]; // Array of image URLs
}

export default function NovusCarousel({ screenshots }: Props) {
  const [current, setCurrent] = useState(0);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const next = () => setCurrent((current + 1) % screenshots.length);
  const prev = () => setCurrent((current - 1 + screenshots.length) % screenshots.length);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-blue-600" />
        <h2 className="text-lg font-bold text-navy">Novus Analytics In Action</h2>
        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">LIVE TRACKING</span>
      </div>

      <div className="relative bg-slate-50 rounded-lg overflow-hidden">
        {/* Image display */}
        <div className="aspect-video bg-slate-100 flex items-center justify-center">
          <img
            src={screenshots[current]}
            alt={`Novus Analytics Screenshot ${current + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation buttons */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Slide indicators */}
        {screenshots.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {screenshots.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        Real-time user behavior tracking powered by Novus.ai analytics
      </p>
    </div>
  );
}
