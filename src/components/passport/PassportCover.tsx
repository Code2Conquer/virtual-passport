import React from "react";
import Image from "next/image";

interface PassportCoverProps {
  userName: string;
  passportNumber: string;
}

const PassportCover = React.forwardRef<HTMLDivElement, PassportCoverProps>(
  ({ userName, passportNumber }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-passport-navy overflow-hidden flex flex-col items-center justify-center text-passport-gold"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(22, 45, 90, 0.8) 0%, rgba(10, 31, 68, 1) 70%)",
        }}
      >
        {/* Subtle leather texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h6v6H0z' fill='none' stroke='%23fff' stroke-width='.5' opacity='.3'/%3E%3C/svg%3E\")",
            backgroundSize: "6px 6px",
          }}
        />

        {/* Gold border */}
        <div className="absolute inset-3 border border-passport-gold/30 rounded-sm" />
        <div className="absolute inset-4 border border-passport-gold/15 rounded-sm" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
          {/* Top subtitle */}
          <p className="text-[10px] tracking-[0.3em] uppercase opacity-70 font-sans">
            Republic of India
          </p>

          {/* Emblem */}
          <div className="w-20 h-20 md:w-24 md:h-24 my-2">
            <Image
              src="/images/emblem-ashoka-lion.svg"
              alt="Ashoka Lion Capital"
              width={96}
              height={96}
              className="w-full h-full text-passport-gold"
              style={{ filter: "brightness(0) saturate(100%) invert(72%) sepia(30%) saturate(600%) hue-rotate(10deg) brightness(90%)" }}
            />
          </div>

          {/* Decorative line */}
          <div className="w-32 h-px bg-passport-gold/40 my-1" />

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-wider">
            VIRTUAL
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif font-black tracking-widest -mt-1">
            PASSPORT
          </h2>

          {/* Decorative line */}
          <div className="w-24 h-px bg-passport-gold/40 my-1" />

          {/* User name */}
          <p className="text-sm md:text-base font-serif tracking-wide mt-2">
            {userName}
          </p>

          {/* Passport number */}
          <p className="text-[9px] font-stamp tracking-widest opacity-50 mt-4">
            {passportNumber}
          </p>
        </div>
      </div>
    );
  }
);

PassportCover.displayName = "PassportCover";
export default PassportCover;
