import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        {/* Novus.ai analytics tracking */}
        <Script id="novus-config" strategy="beforeInteractive">
          {`window.novusConfig = { appId: "17eb64f6-abe5-499b-bf3d-0bb31a5ede74" };`}
        </Script>
        <Script
          src="https://novus.pendio.io/sdk/web.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
