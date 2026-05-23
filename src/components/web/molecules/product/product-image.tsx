"use client";
import React, { useState } from "react";
import ImageViewer from "../../atoms/view-image-atom";
import NextImage from "next/image";

interface IProps {
  images: { id: number; url: string }[];
}

const ProductImage: React.FC<IProps> = ({ images }: IProps) => {
  const [openViewer, setOpenViewer] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);
  return (
    <div className="md:col-span-4 mt-6">
      <div onClick={() => setOpenViewer(true)} className="flex justify-center">
        <NextImage
          src={images[imageIndex].url}
          width={400}
          objectFit="contain"
          height={800}
          alt="Product Image"
          className="max-w-[400px] max-h-[800px]"
        />
      </div>
      <div className="flex gap-2 mt-6 pb-2 overflow-x-scroll max-w-full">
        {images.map((image, index) => {
          return (
            <NextImage
              src={image.url}
              width={100}
              height={100}
              alt="Product Image"
              className="w-20 h-20 object-cover border rounded-md p-1"
              onClick={() => setImageIndex(index)}
            />
          );
        })}
      </div>
      <ImageViewer
        isOpen={openViewer}
        images={images}
        title="Hỗn dịch uống men vi sinh Enterogermina Gut Defense"
        onClose={() => setOpenViewer(false)}
      />
    </div>
  );
};

ProductImage.displayName = "ProductImage";
export default ProductImage;
