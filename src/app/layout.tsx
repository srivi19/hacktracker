import type { Metadata } from "next";
import Script from "next/script";
import PendoInitializer from "@/components/PendoInitializer";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIHackTracker — Hackathon Discovery & Intelligence",
  description:
    "One central hub for all AI hackathons. Auto-summaries, deadline tracking, winning project intelligence, and smart alerts. Built by Vi (Srividya Narayanan).",
  openGraph: {
    title: "AIHackTracker",
    description: "Never miss a hackathon. Know what wins.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dark mode script - runs before hydration */}
        <Script
          id="dark-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('darkMode') === 'true' ||
                  (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
        {/* Novus.ai analytics tracking - Client Component */}
        <PendoInitializer />
      </head>
      <body className="antialiased bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">{children}</body>
    </html>
  );
}
