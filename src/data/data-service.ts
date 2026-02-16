import { supabase } from "@/lib/supabase";
import { User, Trip, StampVariant } from "./types";

/**
 * Fetch a user's passport + trips from Supabase by their slug (URL ID).
 *
 * What happens under the hood:
 * 1. Supabase JS sends a GET request to your Supabase REST API
 * 2. The REST API translates it into a SQL query: SELECT * FROM passports WHERE slug = '...'
 * 3. PostgreSQL runs the query and returns the rows
 * 4. We transform the database rows into the shape our UI components expect
 */
export async function getUserById(userId: string): Promise<User | null> {
  // Step 1: Fetch the passport record by slug
  const { data: passport, error: passportError } = await supabase
    .from("passports")
    .select("*")
    .eq("slug", userId)
    .single(); // .single() means "expect exactly one row"

  if (passportError || !passport) {
    console.error("Passport fetch error:", passportError?.message);
    return null;
  }

  // Step 2: Fetch all trips for this passport
  const { data: trips, error: tripsError } = await supabase
    .from("trips")
    .select("*")
    .eq("passport_id", passport.id)
    .eq("is_visible", true)
    .order("departure_date", { ascending: true });

  if (tripsError) {
    console.error("Trips fetch error:", tripsError.message);
    return null;
  }

  // Step 3: Transform database rows into our UI types
  // The database columns use snake_case, our TypeScript types use camelCase
  return {
    id: passport.slug,
    name: passport.name,
    photo: passport.profile_photo_url || "/images/users/default.jpg",
    bio: passport.bio,
    travelerAdjective: passport.traveler_adjective,
    passportNumber: passport.passport_number,
    issueDate: passport.issued_at,
    expiryDate: new Date(
      new Date(passport.issued_at).getFullYear() + 10,
      new Date(passport.issued_at).getMonth(),
      new Date(passport.issued_at).getDate()
    ).toISOString(),
    nationality: passport.nationality,
    trips: (trips || []).map(
      (t): Trip => ({
        id: t.id,
        destination: {
          city: t.dest_city,
          country: t.dest_country,
          countryCode: t.dest_country_code,
        },
        origin: {
          city: t.origin_city,
          country: t.origin_country,
          countryCode: t.origin_country_code,
        },
        departureDate: t.departure_date,
        returnDate: t.return_date,
        flightNumber: t.flight_number,
        airline: t.airline,
        stayDuration: t.stay_duration,
        type: t.trip_type === "one_way" ? "one-way" : "return",
        stampImage: `/images/cities/${t.dest_city.toLowerCase()}.jpg`,
        stampVariant: t.stamp_variant as StampVariant,
      })
    ),
  };
}

/**
 * Fetch all passport slugs — used by Next.js to pre-generate pages at build time.
 */
export async function getAllUserIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from("passports")
    .select("slug")
    .eq("is_public", true);

  if (error || !data) {
    console.error("getAllUserIds error:", error?.message);
    return [];
  }

  return data.map((row) => row.slug);
}

/**
 * Log a passport view (analytics).
 * Called when someone opens a passport page.
 */
export async function logPassportView(
  passportSlug: string,
  referrer?: string
) {
  const { data: passport } = await supabase
    .from("passports")
    .select("id")
    .eq("slug", passportSlug)
    .single();

  if (!passport) return;

  await supabase.from("passport_views").insert({
    passport_id: passport.id,
    referrer: referrer || "direct",
  });
}

/**
 * Log a share action (analytics).
 * Called when someone clicks a share button.
 */
export async function logPassportShare(
  passportSlug: string,
  platform: string
) {
  const { data: passport } = await supabase
    .from("passports")
    .select("id")
    .eq("slug", passportSlug)
    .single();

  if (!passport) return;

  await supabase.from("passport_shares").insert({
    passport_id: passport.id,
    platform,
  });
}
