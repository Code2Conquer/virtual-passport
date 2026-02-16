import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById, getAllUserIds } from "@/data/data-service";
import PassportBook from "@/components/passport/PassportBook";
import ShareButton from "@/components/shared/ShareButton";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

interface Props {
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  const user = await getUserById(userId);
  if (!user) return {};

  return {
    title: `${user.name}'s Virtual Passport`,
    description: `${user.travelerAdjective} — ${user.trips.length} destinations stamped. View ${user.name}'s travel story.`,
    openGraph: {
      title: `${user.name}'s Virtual Passport`,
      description: `${user.travelerAdjective} | ${user.trips.length} stamps collected`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.name}'s Virtual Passport`,
      description: `${user.travelerAdjective} | ${user.trips.length} stamps`,
    },
  };
}

export async function generateStaticParams() {
  const userIds = await getAllUserIds();
  return userIds.map((userId) => ({ userId }));
}

export default async function PassportPage({ params }: Props) {
  const { userId } = await params;
  const user = await getUserById(userId);
  if (!user) notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const passportUrl = `${baseUrl}/passport/${user.id}`;

  return (
    <main className="min-h-screen bg-passport-bg flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <Link
          href="/"
          className="text-passport-gold/40 text-xs font-stamp tracking-widest hover:text-passport-gold/60 transition-colors"
        >
          VIRTUAL PASSPORT
        </Link>
        <h1 className="text-white text-lg font-serif font-bold mt-1">
          {user.name}&apos;s Passport
        </h1>
        <p className="text-white/30 text-sm font-sans">
          {user.travelerAdjective} &middot; {user.trips.length} destinations
        </p>
      </div>

      {/* Passport */}
      <PassportBook user={user} />

      {/* Share */}
      <ShareButton
        url={passportUrl}
        title={`${user.name}'s Virtual Passport`}
      />

      {/* Footer */}
      <div className="mt-auto pt-12 w-full max-w-4xl">
        <Footer />
      </div>
    </main>
  );
}
