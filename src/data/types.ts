export interface Location {
  city: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2 (e.g., "IN", "FR")
}

export interface Trip {
  id: string;
  destination: Location;
  origin: Location;
  departureDate: string; // ISO 8601 date string "2024-03-15"
  returnDate: string | null; // null for one-way trips
  flightNumber: string; // e.g., "6E-2145"
  airline: string; // e.g., "IndiGo"
  stayDuration: number; // in days
  type: "one-way" | "return";
  stampImage: string; // path to city display picture
  stampVariant: StampVariant; // visual variant for the stamp
}

export type StampVariant = "circle" | "rectangle" | "oval" | "diamond";

export interface User {
  id: string;
  name: string;
  photo: string; // URL or path to user photo
  bio: string; // 1-liner bio
  travelerAdjective: string; // e.g., "The Wanderer", "The Explorer"
  passportNumber: string; // e.g., "VP-2024-83721"
  issueDate: string; // ISO 8601
  expiryDate: string; // ISO 8601
  nationality: string;
  trips: Trip[];
}

export interface StampPosition {
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  rotation: number; // degrees (-15 to 15)
  scale: number; // 0.85 to 1.15
}
