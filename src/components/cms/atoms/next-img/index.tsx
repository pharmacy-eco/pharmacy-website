"use client";
import { useState } from "react";
import Image from "next/legacy/image";

interface NextImgProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "none";
}

let srcDefault = "/assets/logo/logo.png";

const NextImg = ({ src, alt, className, width, height, objectFit = "contain" }: NextImgProps) => {
  const [fallback, setFallback] = useState("");
  const handleError = () => {
    setFallback(srcDefault);
  };

  return (
    <Image
      src={fallback || src}
      alt={alt}
      onError={handleError}
      width={width}
      height={height}
      loading="eager"
      priority
      objectFit={objectFit}
      layout="fill"
      unoptimized
    />
  );
};

export default NextImg;
