import { ImageResponse } from "next/og";
import { getUserById } from "@/data/data-service";

export const runtime = "edge";
export const alt = "Virtual Passport";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUserById(userId);

  if (!user) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#0A1F44",
            color: "#C4A35A",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontFamily: "serif",
          }}
        >
          Virtual Passport — Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0A1F44 0%, #162D5A 50%, #0A1F44 100%)",
          color: "#C4A35A",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          padding: 60,
        }}
      >
        {/* Left: Passport cover */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 280,
            height: 380,
            border: "2px solid rgba(196, 163, 90, 0.4)",
            borderRadius: 12,
            marginRight: 60,
            padding: 30,
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              opacity: 0.6,
              marginBottom: 12,
            }}
          >
            REPUBLIC OF INDIA
          </div>
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              border: "2px solid rgba(196, 163, 90, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              marginBottom: 16,
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>VIRTUAL</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "0.1em",
            }}
          >
            PASSPORT
          </div>
          <div
            style={{
              width: 80,
              height: 1,
              background: "rgba(196, 163, 90, 0.3)",
              margin: "16px 0",
            }}
          />
          <div style={{ fontSize: 14, opacity: 0.7 }}>{user.name}</div>
        </div>

        {/* Right: Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#FFFFFF",
              lineHeight: 1.2,
            }}
          >
            {user.name}
          </div>
          <div
            style={{
              fontSize: 22,
              marginTop: 8,
              opacity: 0.8,
            }}
          >
            {user.travelerAdjective}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              fontSize: 18,
              color: "#F5F0E1",
            }}
          >
            {user.trips.length} destinations stamped
          </div>
          <div
            style={{
              fontSize: 14,
              marginTop: 12,
              color: "#F5F0E1",
              opacity: 0.5,
              letterSpacing: "0.15em",
              fontFamily: "monospace",
            }}
          >
            {user.passportNumber}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
