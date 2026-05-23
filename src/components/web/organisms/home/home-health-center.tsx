import React from "react";
import Link from "next/link";
import CardFeatured from "../../atoms/card-atom/card-featured";
import NextImg from "../../atoms/next-img";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import { IBlog } from "@/types/web/common";

interface IProps {
  blogs: IBlog[];
}

const HomeHealthCenter: React.FC<IProps> = ({ blogs }) => {
  return (
    <CardFeatured title="Góc sức khỏe" ic="/assets/icons/goc_suc_khoe_77c4d4524f.webp" className="w-ful h-full py-6">
      <SliderRoot
        dots={false}
        gap="lg"
        infinite={false}
        slidesToShow={4}
        isBtnCenter
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1.5
            }
          }
        ]}
      >
        {blogs.map((x, idx) => {
          return (
            <Link
              href={"/bai-dang/" + (x.slug || "")}
              key={idx}
              className="!flex flex-col w-full !min-h-[350px] group p-4 bg-white rounded-xl overflow-hidden"
            >
              <div className="w-full relative pb-[60%] rounded-xl overflow-hidden">
                <NextImg
                  width={200}
                  height={200}
                  src=""
                  alt={x.title}
                  className="absolute w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 pt-4">
                <h4 className="text-lg text-black-02 font-semibold line-clamp-2">{x.title}</h4>
                <p className="text-base text-black-4a line-clamp-3 font-normal">{x.description}</p>
                <p className="inline-flex gap-1 items-center text-sm text-blue-12 font-medium pt-4">
                  Tìm hiểu thêm
                  <DynamicIcon name="chevron-right" size={20} className="stroke-blue-12" />
                </p>
              </div>
            </Link>
          );
        })}
      </SliderRoot>
    </CardFeatured>
  );
};

HomeHealthCenter.displayName = "HomeHealthCenter";
export default HomeHealthCenter;
