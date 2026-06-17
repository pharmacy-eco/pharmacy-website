import React from "react";
import NextImg from "../../atoms/next-img";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import { IBanner } from "@/types/web/common";

interface IProps {
  banners: IBanner[];
}

const HomeSlider: React.FC<IProps> = ({ banners }) => {
  return (
    <div className="w-full h-[170px] md:h-[246px] my-4 grid gap-3 grid-cols-12">
      <div className="col-span-12 md:col-span-8 h-full">
        <SliderRoot>
          {banners.map((x, idx) => {
            return (
              <div key={idx} className="w-full h-full relative">
                <NextImg
                  width={805}
                  height={170}
                  src={x.image || "/assets/image/header_desktop_f832104627.webp"}
                  alt={x.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </SliderRoot>
      </div>
      <div className="col-span-4 hidden md:flex flex-col gap-3 h-full">
        <div className="w-full h-1/2 relative">
          <NextImg
            width={805}
            height={300}
            src="/assets/image/medicine.jpg"
            alt="Medicare"
            objectFit="cover"
            className="absolute w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full h-1/2 relative">
          <NextImg
            width={805}
            height={300}
            src="/assets/image/header_desktop_f832104627.webp"
            alt="Medicare"
            objectFit="cover"
            className="absolute w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

HomeSlider.displayName = "HomeSlider";
export default HomeSlider;
