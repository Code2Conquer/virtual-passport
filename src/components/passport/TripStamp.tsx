"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trip, StampPosition } from "@/data/types";
import { formatDate, getStampColor } from "@/lib/utils";
import CountryFlag from "@/components/shared/CountryFlag";

interface TripStampProps {
  trip: Trip;
  position: StampPosition;
  index: number;
  animate: boolean;
}

export default function TripStamp({
  trip,
  position,
  index,
  animate,
}: TripStampProps) {
  const color = getStampColor(trip.destination.countryCode);

  const borderClass =
    trip.stampVariant === "circle"
      ? "rounded-full"
      : trip.stampVariant === "oval"
        ? "rounded-[50%]"
        : trip.stampVariant === "diamond"
          ? "rotate-45"
          : "rounded-md";

  // Compact sizing per variant — prevents stamps from being oversized
  const sizeClass =
    trip.stampVariant === "circle"
      ? "w-32 h-32 md:w-36 md:h-36"
      : trip.stampVariant === "oval"
        ? "w-28 h-36 md:w-32 md:h-40"
        : trip.stampVariant === "diamond"
          ? "w-28 h-28 md:w-32 md:h-32"
          : "w-36 h-28 md:w-40 md:h-32"; // rectangle — wider than tall

  const colorClass = `stamp--${color}`;

  return (
    <motion.div
      initial={animate ? { scale: 2.5, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : undefined}
      transition={
        animate
          ? {
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: index * 0.2,
            }
          : undefined
      }
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `rotate(${position.rotation}deg) scale(${position.scale})`,
      }}
    >
      <div className={`stamp ${colorClass}`}>
        <div
          className={`border-[3px] border-current ${sizeClass} ${borderClass} flex items-center justify-center`}
          style={{
            filter:
              "url(#rough-edge) drop-shadow(0 1px 2px rgba(0,0,0,0.05))",
          }}
        >
          {/* Stamp content — counter-rotate for diamond so text is readable */}
          <div className={`flex flex-col items-center text-center gap-0.5 p-1.5 ${
            trip.stampVariant === "diamond" ? "-rotate-45" : ""
          }`}>
            {/* Country flag */}
            <CountryFlag countryCode={trip.destination.countryCode} size={18} />

            {/* City name */}
            <h3 className="font-serif font-bold text-sm md:text-base leading-tight mt-1">
              {trip.destination.city.toUpperCase()}
            </h3>

            {/* Country */}
            <p className="text-[8px] tracking-wider opacity-70 font-sans">
              {trip.destination.country}
            </p>

            {/* Decorative line */}
            <div className="w-8 h-px bg-current opacity-30 my-0.5" />

            {/* Date */}
            <p className="font-stamp text-[9px] md:text-[10px] tracking-wide">
              {formatDate(trip.departureDate)}
            </p>

            {/* Flight info */}
            <p className="text-[7px] opacity-60 font-sans">
              {trip.airline} • {trip.flightNumber}
            </p>

            {/* Stay duration */}
            <p className="font-stamp text-[8px] opacity-50 mt-0.5">
              {trip.stayDuration} DAYS •{" "}
              {trip.type === "return" ? "RETURN" : "ONE-WAY"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
