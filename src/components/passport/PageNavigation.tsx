"use client";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PageNavigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PageNavigationProps) {
  return (
    <div className="hidden md:flex items-center justify-center gap-6 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className="w-10 h-10 rounded-full border border-passport-gold/30 text-passport-gold/70 hover:bg-passport-gold/10 hover:text-passport-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        aria-label="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 12L6 8L10 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="text-xs text-passport-gold/40 font-stamp tracking-wider">
        {currentPage + 1} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}
        className="w-10 h-10 rounded-full border border-passport-gold/30 text-passport-gold/70 hover:bg-passport-gold/10 hover:text-passport-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center justify-center"
        aria-label="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
