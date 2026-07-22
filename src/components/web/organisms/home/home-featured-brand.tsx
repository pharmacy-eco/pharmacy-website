import React from "react";
import CardFeatured from "../../atoms/card-atom/card-featured";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import NextImg from "../../atoms/next-img";
import Link from "next/link";
import { IBrand } from "@/types/web/common";

interface IProps {
  brands: IBrand[];
}

const HomeFeaturedBrand: React.FC<IProps> = ({ brands }) => {
  return (
    <CardFeatured title="Thương hiệu yêu thích" className="py-6">
      <SliderRoot
        dots={false}
        gap="lg"
        infinite={false}
        slidesToShow={5}
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
        {brands.map((brand) => {
          const image = brand.image?.replace(/^http:\/\//, "https://") || "";

          return (
            <Link href={`/${brand.slug}`} key={brand.id} className="w-full h-full group">
              <div className="w-full h-full p-4 pb-8 !flex flex-col items-center justify-center rounded-xl bg-white transition-all duration-300 border border-transparent group-hover:border-blue-1d">
                <div className="w-40 h-40 relative">
                  <NextImg
                    width={160}
                    height={160}
                    alt={brand.meta_name || brand.name}
                    src={image}
                    className="absolute w-full h-full"
                  />
                </div>
                <h4 className="text-blue-12 text-base text-center font-medium line-clamp-2 mt-4">{brand.name}</h4>
              </div>
            </Link>
          );
        })}
      </SliderRoot>
    </CardFeatured>
  );
};

HomeFeaturedBrand.displayName = "HomeFeaturedBrand";
export default HomeFeaturedBrand;
