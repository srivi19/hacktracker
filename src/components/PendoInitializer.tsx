"use client";

import Script from "next/script";

function getOrCreateVisitorId(): string {
  const key = 'aihacktracker_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

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
              id: getOrCreateVisitorId(),
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
