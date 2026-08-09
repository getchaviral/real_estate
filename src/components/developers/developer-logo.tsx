"use client";

import Image from "next/image";
import { useState } from "react";

interface DeveloperLogoProps {
  src: string;
  alt: string;
}

export default function DeveloperLogo({ src, alt }: DeveloperLogoProps) {
  const [imageSrc, setImageSrc] = useState(src || "/images/developer-logo-fallback.svg");

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={80}
      height={80}
      className="rounded-full bg-white object-contain p-2"
      onError={() => setImageSrc("/images/developer-logo-fallback.svg")}
    />
  );
}
