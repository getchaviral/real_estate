"use client";

import { useState } from "react";
import { Location } from "@/types/location";
import Container from "@/components/shared/container";

const HERO_FALLBACK =
  "https://images.pexels.com/photos/7587880/pexels-photo-7587880.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function HeroSection({ location }: { location: Location }) {
  const [imgSrc, setImgSrc] = useState(location.heroImage || HERO_FALLBACK);

  // Preload to detect broken images; fall back if the URL fails
  const handleError = () => setImgSrc(HERO_FALLBACK);

  return (
    <section className="relative h-96">
      {/* Background image with fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{ backgroundImage: `url("${imgSrc}")` }}
      />
      {/* Hidden <img> to detect load errors for background-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt=""
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0 pointer-events-none"
        onError={handleError}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <Container className="relative flex h-full flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold md:text-6xl drop-shadow-lg">
          Properties in {location.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow">
          {location.description}
        </p>
      </Container>
    </section>
  );
}
