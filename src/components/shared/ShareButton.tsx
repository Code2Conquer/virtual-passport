"use client";

import { useState, useEffect } from "react";
import { logPassportShare } from "@/data/data-service";

interface ShareButtonProps {
  url: string;
  title: string;
  passportSlug: string; // needed to log which passport was shared
}

export default function ShareButton({ url, title, passportSlug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleCopy = async () => {
    logPassportShare(passportSlug, "clipboard");
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    logPassportShare(passportSlug, "native");
    if (navigator.share) {
      await navigator.share({ title, url });
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-3 mt-6">
      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-passport-gold/10 border border-passport-gold/20 text-passport-gold text-xs font-sans hover:bg-passport-gold/20 transition-colors"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Copy Link
          </>
        )}
      </button>

      {/* Native share (mobile) */}
      {canShare && (
        <button
          onClick={handleNativeShare}
          className="md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-passport-gold/10 border border-passport-gold/20 text-passport-gold text-xs font-sans hover:bg-passport-gold/20 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logPassportShare(passportSlug, "whatsapp")}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-passport-gold/10 border border-passport-gold/20 text-passport-gold text-xs font-sans hover:bg-passport-gold/20 transition-colors"
      >
        WhatsApp
      </a>

      {/* Twitter/X */}
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => logPassportShare(passportSlug, "twitter")}
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-passport-gold/10 border border-passport-gold/20 text-passport-gold text-xs font-sans hover:bg-passport-gold/20 transition-colors"
      >
        X / Twitter
      </a>
    </div>
  );
}
