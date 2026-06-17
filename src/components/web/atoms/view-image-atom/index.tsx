"use client";
import React, { useEffect, useState } from "react";
import ButtonRoot from "../button-atom/button-root";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";
import NextImage from "next/image";

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: number; url: string }[];
  title?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, onClose, images, title = "" }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl max-w-2xl max-h-xl w-full overflow-hidden relative transform transition-all duration-300 ${
          showModal ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Close button */}
        <DynamicIcon
          onClick={onClose}
          name="x"
          size="20"
          className="w-4 h-4 md:w-5 md:h-5 text-gray-500 absolute top-2 right-2 cursor-pointer hover:text-gray-900"
        />
        {/* Title */}
        {title && <div className="px-4 text-center text-lg mb-4 font-semibold">{title}</div>}

        {/* Main Image */}
        <div className="flex justify-center items-center relative h-96">
          <ButtonRoot
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
          >
            <DynamicIcon name="chevron-left" size="10" />
          </ButtonRoot>
          <NextImage
            src={images[currentIndex].url}
            width={600}
            height={800}
            alt={`Image ${currentIndex + 1}`}
            className="h-full max-w-full object-contain my-4"
            unoptimized={images[currentIndex].url.startsWith("http")}
          />
          <ButtonRoot
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-400 hover:bg-gray-500 rounded-full"
          >
            <DynamicIcon name="chevron-right" size="10" />
          </ButtonRoot>
        </div>

        {/* Pagination */}
        <div className="text-center text-sm my-2 py-2">
          {currentIndex + 1}/{images.length}
        </div>

        {/* Thumbnails */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-4">
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-16 h-16 flex-shrink-0 border-2 rounded p-1 cursor-pointer ${
                currentIndex === i ? "border-blue-500" : ""
              }`}
            >
              <NextImage
                src={img.url}
                alt={`thumb-${i}`}
                width={100}
                height={100}
                className="w-full h-full object-cover rounded"
                unoptimized={img.url.startsWith("http")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
