import React from "react";
import { Trip } from "@/data/types";
import { calculateStampPositions } from "@/lib/stamp-layout";
import TripStamp from "./TripStamp";
import PassportPageWrapper from "./PassportPageWrapper";

interface StampPageProps {
  trips: Trip[];
  pageNumber: number;
  pageIndex: number;
  animateStamps: boolean;
}

const StampPage = React.forwardRef<HTMLDivElement, StampPageProps>(
  ({ trips, pageNumber, pageIndex, animateStamps }, ref) => {
    const positions = calculateStampPositions(trips.length, pageIndex);

    return (
      <PassportPageWrapper ref={ref} pageNumber={pageNumber}>
        <div className="relative w-full h-full">
          {trips.map((trip, i) => (
            <TripStamp
              key={trip.id}
              trip={trip}
              position={positions[i]}
              index={i}
              animate={animateStamps}
            />
          ))}
        </div>
      </PassportPageWrapper>
    );
  }
);

StampPage.displayName = "StampPage";
export default StampPage;
