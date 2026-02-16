import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-passport-navy/40 via-passport-bg to-passport-bg" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="text-passport-gold/60 text-sm font-stamp tracking-widest uppercase mb-4">
            Virtual Passport
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white leading-tight">
            Your Travel Story,
            <br />
            <span className="text-passport-gold">Stamped.</span>
          </h1>
          <p className="mt-6 text-lg text-white/50 font-sans max-w-lg mx-auto lg:mx-0">
            Turn your ixigo travel history into a beautiful, shareable digital
            passport — complete with stamps for every destination.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/passport/neeraj-kumar"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-passport-gold text-passport-navy font-serif font-bold text-base hover:bg-passport-gold-light transition-colors shadow-lg shadow-passport-gold/20"
            >
              View Demo Passport
            </Link>
            <Link
              href="/passport/demo-user"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-passport-gold/30 text-passport-gold text-base font-sans hover:bg-passport-gold/10 transition-colors"
            >
              Try Another
            </Link>
          </div>
        </div>

        {/* Right: Passport visual */}
        <div className="flex-shrink-0 relative">
          <div
            className="w-64 h-80 md:w-72 md:h-96 bg-passport-navy rounded-lg shadow-2xl shadow-black/50 border border-passport-gold/20 flex flex-col items-center justify-center text-passport-gold p-8"
            style={{
              transform: "perspective(800px) rotateY(-8deg) rotateX(3deg)",
              backgroundImage:
                "radial-gradient(ellipse at 30% 20%, rgba(22, 45, 90, 0.8) 0%, rgba(10, 31, 68, 1) 70%)",
            }}
          >
            <div className="w-16 h-16 mb-4 opacity-70">
              <Image
                src="/images/emblem-ashoka-lion.svg"
                alt=""
                width={64}
                height={64}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(72%) sepia(30%) saturate(600%) hue-rotate(10deg) brightness(90%)",
                }}
              />
            </div>
            <p className="text-[8px] tracking-[0.3em] opacity-50 mb-2">
              REPUBLIC OF INDIA
            </p>
            <p className="text-lg font-serif font-bold tracking-wider">
              VIRTUAL
            </p>
            <p className="text-xl font-serif font-black tracking-widest">
              PASSPORT
            </p>
            <div className="w-20 h-px bg-passport-gold/30 my-3" />
            <p className="text-[10px] opacity-40 font-stamp">
              VP-2024-XXXXX
            </p>
          </div>
          {/* Floating glow effect */}
          <div className="absolute -inset-8 bg-passport-gold/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
