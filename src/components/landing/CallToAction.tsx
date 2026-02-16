import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
          Ready to see your stamps?
        </h2>
        <p className="text-white/40 font-sans mb-8">
          Explore a demo passport and see your travel history come to life.
        </p>
        <Link
          href="/passport/neeraj-kumar"
          className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-passport-gold text-passport-navy font-serif font-bold text-lg hover:bg-passport-gold-light transition-colors shadow-lg shadow-passport-gold/20"
        >
          View Demo Passport
        </Link>
      </div>
    </section>
  );
}
