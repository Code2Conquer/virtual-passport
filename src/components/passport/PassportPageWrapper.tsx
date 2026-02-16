import React from "react";

interface PassportPageWrapperProps {
  children: React.ReactNode;
  pageNumber?: number;
}

const PassportPageWrapper = React.forwardRef<
  HTMLDivElement,
  PassportPageWrapperProps
>(({ children, pageNumber }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-passport-cream overflow-hidden"
    >
      {/* SVG filter for rough stamp edges */}
      <svg width="0" height="0" className="absolute">
        <filter id="rough-edge">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="5"
          />
          <feDisplacementMap in="SourceGraphic" scale="2" />
        </filter>
      </svg>

      {/* Watermark */}
      <div className="passport-page-watermark" />

      {/* Thin decorative border */}
      <div className="absolute inset-2 border border-passport-cream-dark rounded-sm pointer-events-none" />

      {/* Page content */}
      <div className="relative z-10 w-full h-full p-4">{children}</div>

      {/* Page number */}
      {pageNumber !== undefined && (
        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-passport-ink-black/30 font-stamp z-10">
          {pageNumber}
        </div>
      )}
    </div>
  );
});

PassportPageWrapper.displayName = "PassportPageWrapper";
export default PassportPageWrapper;
