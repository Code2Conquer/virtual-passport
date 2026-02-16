import React from "react";
import Image from "next/image";

interface PassportBackCoverProps {
  passportNumber: string;
}

const PassportBackCover = React.forwardRef<
  HTMLDivElement,
  PassportBackCoverProps
>(({ passportNumber }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-passport-navy overflow-hidden flex flex-col items-center justify-end pb-12 text-passport-gold"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 70% 80%, rgba(22, 45, 90, 0.8) 0%, rgba(10, 31, 68, 1) 70%)",
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h6v6H0z' fill='none' stroke='%23fff' stroke-width='.5' opacity='.3'/%3E%3C/svg%3E\")",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Gold border */}
      <div className="absolute inset-3 border border-passport-gold/20 rounded-sm" />

      {/* Small emblem */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-30">
        <Image
          src="/images/emblem-ashoka-lion.svg"
          alt=""
          width={48}
          height={48}
          style={{
            filter:
              "brightness(0) saturate(100%) invert(72%) sepia(30%) saturate(600%) hue-rotate(10deg) brightness(90%)",
          }}
        />
      </div>

      {/* Powered by */}
      <div className="relative z-10 text-center mb-6">
        <p className="text-[9px] tracking-widest opacity-40 font-sans uppercase">
          Powered by
        </p>
        <p className="text-lg font-serif font-bold opacity-60 mt-0.5">
          ixigo
        </p>
      </div>

      {/* Barcode-style passport number strip */}
      <div className="relative z-10 bg-passport-gold/10 px-6 py-2 rounded-sm">
        <p className="font-stamp text-[10px] tracking-[0.4em] opacity-60">
          {passportNumber}
        </p>
      </div>
    </div>
  );
});

PassportBackCover.displayName = "PassportBackCover";
export default PassportBackCover;
