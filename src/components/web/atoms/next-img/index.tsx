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
  return <Image src={src} alt={alt} className={className} width={width} height={height} objectFit={objectFit} />;
};

export default NextImg;
