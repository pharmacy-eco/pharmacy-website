import React from "react";
import CardFeatured from "../../atoms/card-atom/card-featured";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import NextImg from "../../atoms/next-img";
import Link from "next/link";

interface IProps {}

const HomeFeaturedBrand: React.FC<IProps> = () => {
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
        {Array(6)
          .fill(0)
          .map((_, idx) => {
            return (
              <Link href="/" key={idx} className="w-full h-full group">
                <div className="w-full h-full p-4 pb-8 !flex flex-col items-center justify-center rounded-xl bg-white transition-all duration-300 border border-transparent group-hover:border-blue-1d">
                  <div className="w-40 h-40 relative">
                    <NextImg
                      width={160}
                      height={160}
                      alt="Long Châu"
                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/256x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/3_a008f780c5.jpg"
                      className="absolute w-full h-full"
                    />
                  </div>
                  <div className="w-full h-auto mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    <NextImg
                      width={203}
                      height={56}
                      alt="Long Châu"
                      src="https://cdn.nhathuoclongchau.com.vn/unsafe/256x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/smalls/OCAVILL_1_0fa129f445.png"
                    />
                  </div>
                  <h4 className="text-blue-12 text-base text-center font-medium line-clamp-2 mt-4">Giảm đến 39%</h4>
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
