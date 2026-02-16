import Hero from "@/components/landing/Hero";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureShowcase />
      <CallToAction />
      <Footer />
    </main>
  );
}
