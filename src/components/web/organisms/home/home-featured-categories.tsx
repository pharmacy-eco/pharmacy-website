import React from "react";
import CardFeatured from "../../atoms/card-atom/card-featured";
import NextImg from "../../atoms/next-img";
import Link from "next/link";
import { ICategory } from "@/types/web/category";

interface IProps {
  categories: ICategory[];
}

const HomeFeaturedCategories: React.FC<IProps> = ({ categories }) => {
  return (
    <CardFeatured title="Danh mục nổi bật" className="py-6">
      <div className="grid gap-3 grid-cols-12">
        {categories.map((category) => {
          const image = category.image?.replace(/^http:\/\//, "https://") || "";

          return (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="col-span-6 md:col-span-3 lg:col-span-2 w-full h-full flex flex-col items-center px-4 py-5 rounded-xl bg-white transition-all duration-300 hover:opacity-70"
            >
              <div className="inline-flex w-6 h-6">
                <NextImg width={24} height={24} alt={category.name} src={image} />
              </div>
              <h4 className="text-sm font-semibold py-2 text-center">{category.name}</h4>
              <p className="text-[13px] font-semibold text-[#657384]">{category.countProduct ?? 0} sản phẩm</p>
            </Link>
          );
        })}
      </div>
    </CardFeatured>
  );
};

HomeFeaturedCategories.displayName = "HomeFeaturedCategories";
export default HomeFeaturedCategories;
