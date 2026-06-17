"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface NextImgProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "none";
}

const NextImg = ({ src, alt, className, width, height, objectFit = "contain" }: NextImgProps) => {
  const [fallback, setFallback] = useState(false);
  const imageSrc = fallback || !src ? "/assets/image/medicine.jpg" : src;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={{ objectFit }}
      unoptimized={imageSrc.startsWith("http")}
      onError={() => setFallback(true)}
    />
  );
};

export default NextImg;
