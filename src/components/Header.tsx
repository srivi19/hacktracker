"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
      setDarkMode(true);
    }
  };

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between">
        {/* Left — hackathon name */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] sm:text-xs font-bold tracking-widest text-accent uppercase whitespace-nowrap">
            MIND THE PRODUCT HACKATHON
          </span>
          <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 tracking-wide hidden sm:inline whitespace-nowrap">
            World Product Day 2026
          </span>
        </div>

        {/* Right — tags + nav */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dark mode toggle */}
          {mounted && (
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Tracked by Novus.AI - Links to Analytics */}
          <Link href="/dashboard?tab=novus" className="flex items-center gap-1.5 mr-1 hover:opacity-80 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="7" height="7" rx="1.5" fill="#f472b6"/>
              <rect x="9" y="0" width="7" height="7" rx="1.5" fill="#a78bfa"/>
              <rect x="0" y="9" width="7" height="7" rx="1.5" fill="#60a5fa"/>
              <rect x="9" y="9" width="7" height="7" rx="1.5" fill="#34d399"/>
            </svg>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest hidden sm:inline">Tracked by</span>
            <span className="text-[10px] font-bold border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5 text-slate-600 dark:text-slate-400 tracking-wide hidden sm:inline hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">NOVUS.AI</span>
          </Link>
          <span className="chip hidden md:inline-flex">Product Innovation</span>
          <span className="chip hidden sm:inline-flex text-green-700 border-green-200 bg-green-50">
            Up to $2,000
          </span>
          <span className="chip hidden lg:inline-flex">Global · Virtual</span>

          <div className="ml-3 flex items-center gap-1">
            <Link
              href="/"
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                pathname === "/"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
