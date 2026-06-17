import React from "react";
import CardFeatured from "../../atoms/card-atom/card-featured";
import NextImg from "../../atoms/next-img";
import Link from "next/link";

interface IProps {}

const HomeFeaturedCategories: React.FC<IProps> = () => {
  return (
    <CardFeatured title="Danh mục nổi bật" className="py-6">
      <div className="grid gap-3 grid-cols-12">
        {Array(12)
          .fill(0)
          .map((_, idx) => {
            return (
              <Link
                key={idx}
                href="/"
                className="col-span-6 md:col-span-3 lg:col-span-2 w-full h-full flex flex-col items-center px-4 py-5 rounded-xl bg-white transition-all duration-300 hover:opacity-70"
              >
                <div className="inline-flex w-6 h-6">
                  <NextImg
                    width={24}
                    height={24}
                    alt="Medicare"
                    src="/assets/icons/danh_muc_noi_bat_d03496597a.webp"
                  />
                </div>
                <h4 className="text-sm font-semibold py-2">Thần kinh não</h4>
                <p className="text-[13px] font-semibold text-[#657384]">92 sản phẩm</p>
              </Link>
            );
          })}
      </div>
    </CardFeatured>
  );
};

HomeFeaturedCategories.displayName = "HomeFeaturedCategories";
export default HomeFeaturedCategories;
