"use client";

import Script from "next/script";

export default function PendoInitializer() {
  return (
    <Script
      src="https://cdn.pendo.io/agent/static/17eb64f6-abe5-499b-bf3d-0bb31a5ede74/pendo.js"
      strategy="afterInteractive"
      onLoad={() => {
        const pendo = (window as any).pendo;
        if (pendo) {
          pendo.initialize({
            visitor: {
              id: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
            },
            account: {
              id: 'aihacktracker-prod'
            }
          });
        }
      }}
    />
  );
}
