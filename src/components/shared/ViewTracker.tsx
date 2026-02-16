"use client";

import { useEffect } from "react";
import { logPassportView } from "@/data/data-service";

interface ViewTrackerProps {
  passportSlug: string;
}

/**
 * Invisible component — renders nothing on screen.
 * On mount (= when page loads), it logs a view to the database.
 * useEffect runs only in the browser, never during build.
 */
export default function ViewTracker({ passportSlug }: ViewTrackerProps) {
  useEffect(() => {
    // Detect where the visitor came from (WhatsApp, Twitter, direct, etc.)
    const referrer = detectReferrer();
    logPassportView(passportSlug, referrer);
  }, [passportSlug]);

  // Renders nothing — it's purely for side effects
  return null;
}

function detectReferrer(): string {
  if (typeof window === "undefined") return "direct";

  const ref = document.referrer.toLowerCase();
  if (ref.includes("whatsapp") || ref.includes("wa.me")) return "whatsapp";
  if (ref.includes("twitter") || ref.includes("t.co") || ref.includes("x.com")) return "twitter";
  if (ref.includes("linkedin")) return "linkedin";
  if (ref.includes("instagram")) return "instagram";
  if (ref.includes("facebook") || ref.includes("fb.com")) return "facebook";
  if (ref === "") return "direct";
  return "other";
}
