"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { User, Trip } from "@/data/types";
import PassportCover from "./PassportCover";
import ProfilePage from "./ProfilePage";
import StampPage from "./StampPage";
import PassportBackCover from "./PassportBackCover";
import PageNavigation from "./PageNavigation";

// Dynamic import for react-pageflip to avoid SSR issues
const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod) => mod.default),
  { ssr: false }
) as React.ComponentType<any>;

interface PassportBookProps {
  user: User;
}

export default function PassportBook({ user }: PassportBookProps) {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [animatedPages, setAnimatedPages] = useState<Set<number>>(
    new Set([0])
  );

  // Split trips into pages of 2
  const stampPages = useMemo(() => {
    const pages: Trip[][] = [];
    for (let i = 0; i < user.trips.length; i += 2) {
      pages.push(user.trips.slice(i, i + 2));
    }
    return pages;
  }, [user.trips]);

  // Total pages: cover + profile + stamp pages + back cover
  const totalPages = 2 + stampPages.length + 1;

  const handleFlip = useCallback(
    (e: { data: number }) => {
      setCurrentPage(e.data);
      setAnimatedPages((prev) => {
        if (prev.has(e.data)) return prev;
        const next = new Set(prev);
        next.add(e.data);
        return next;
      });
    },
    []
  );

  const goToPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const goToNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Passport book */}
      <div className="w-[90vw] max-w-[500px] aspect-[5/7]">
        <HTMLFlipBook
          width={400}
          height={560}
          size="stretch"
          minWidth={280}
          maxWidth={500}
          minHeight={392}
          maxHeight={700}
          showCover={true}
          mobileScrollSupport={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          drawShadow={true}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          startPage={0}
          onFlip={handleFlip}
          ref={bookRef}
          className="passport-book"
        >
          {/* Page 0: Front Cover */}
          <div className="page-wrapper">
            <PassportCover
              userName={user.name}
              passportNumber={user.passportNumber}
            />
          </div>

          {/* Page 1: Profile */}
          <div className="page-wrapper">
            <ProfilePage user={user} />
          </div>

          {/* Stamp pages */}
          {stampPages.map((trips, i) => (
            <div key={`stamp-${i}`} className="page-wrapper">
              <StampPage
                trips={trips}
                pageNumber={i + 2}
                pageIndex={i}
                animateStamps={animatedPages.has(i + 2)}
              />
            </div>
          ))}

          {/* Back Cover */}
          <div className="page-wrapper">
            <PassportBackCover passportNumber={user.passportNumber} />
          </div>
        </HTMLFlipBook>
      </div>

      {/* Navigation */}
      <PageNavigation
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={goToPrev}
        onNext={goToNext}
      />

      {/* Swipe hint on mobile */}
      <p className="md:hidden text-[10px] text-passport-gold/30 mt-4 font-stamp tracking-wider">
        Swipe to flip pages
      </p>
    </div>
  );
}
