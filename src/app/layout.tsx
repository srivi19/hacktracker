import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
