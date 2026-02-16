const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14 14 0 014 10 14 14 0 01-4 10 14 14 0 01-4-10 14 14 0 014-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: "Passport-Style Stamps",
    description:
      "Every destination gets a unique ink stamp with city details, flight info, and authentic passport aesthetics.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4v16h16" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20l5-5 3 3 4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Page-Flip Experience",
    description:
      "Flip through your passport pages with realistic 3D page-turn animations. Swipe on mobile, click on desktop.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Share Your Story",
    description:
      "Get a unique link to your passport. Share it on WhatsApp, Twitter, or anywhere — with a beautiful preview card.",
  },
];

export default function FeatureShowcase() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-white mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-passport-gold/20 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-passport-gold/10 text-passport-gold mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-white/40 font-sans leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
