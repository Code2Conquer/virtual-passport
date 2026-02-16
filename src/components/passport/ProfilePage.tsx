import React from "react";
import Image from "next/image";
import { User } from "@/data/types";
import { formatDate, generateMRZ } from "@/lib/utils";
import PassportPageWrapper from "./PassportPageWrapper";

interface ProfilePageProps {
  user: User;
}

const ProfilePage = React.forwardRef<HTMLDivElement, ProfilePageProps>(
  ({ user }, ref) => {
    const mrz = generateMRZ(user.name, user.passportNumber);

    return (
      <PassportPageWrapper ref={ref} pageNumber={1}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="text-center mb-3">
            <p className="text-[8px] tracking-[0.2em] uppercase text-passport-ink-black/40 font-sans">
              Republic of India — Virtual Passport
            </p>
          </div>

          {/* Main content area */}
          <div className="flex gap-3 flex-1">
            {/* Left: Photo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-30 md:w-28 md:h-36 border-2 border-passport-cream-dark rounded-sm overflow-hidden bg-passport-cream-dark shadow-inner">
                <div className="w-full h-full bg-gradient-to-br from-passport-navy/10 to-passport-navy/30 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-passport-navy/20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right: Fields */}
            <div className="flex-1 flex flex-col gap-2 text-passport-ink-black">
              <Field label="Surname / Name" value={user.name} />
              <Field label="Title" value={user.travelerAdjective} />
              <Field label="Nationality" value={user.nationality} />
              <Field label="Bio" value={user.bio} small />
              <div className="flex gap-3">
                <Field
                  label="Date of Issue"
                  value={formatDate(user.issueDate)}
                  small
                />
                <Field
                  label="Date of Expiry"
                  value={formatDate(user.expiryDate)}
                  small
                />
              </div>
              <Field label="Passport No." value={user.passportNumber} />
              <Field
                label="Destinations Stamped"
                value={`${user.trips.length} countries`}
              />
            </div>
          </div>

          {/* MRZ Zone */}
          <div className="mt-auto pt-3 border-t border-passport-cream-dark">
            <div className="bg-passport-paper px-2 py-1.5 rounded-sm font-stamp text-[8px] md:text-[9px] tracking-wider text-passport-ink-black/60 leading-relaxed overflow-hidden">
              <div>{mrz}</div>
              <div>
                {user.passportNumber.replace(/-/g, "")}
                {"<".repeat(20)}
                IND
                {"<".repeat(10)}
              </div>
            </div>
          </div>
        </div>
      </PassportPageWrapper>
    );
  }
);

ProfilePage.displayName = "ProfilePage";
export default ProfilePage;

function Field({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div>
      <p className="text-[7px] uppercase tracking-wider text-passport-ink-black/40 font-sans">
        {label}
      </p>
      <p
        className={`font-serif font-bold text-passport-ink-black/80 leading-tight ${
          small ? "text-[10px]" : "text-xs md:text-sm"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
