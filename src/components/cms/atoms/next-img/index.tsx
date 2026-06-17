"use client";
import { useState } from "react";
import Image from "next/image";

interface NextImgProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "none";
}

let srcDefault = "/assets/logo/icon.png";

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
      loading="eager"
      priority
      fill
      sizes={`${width || 180}px`}
      style={{ objectFit }}
      unoptimized
    />
  );
};

export default NextImg;
