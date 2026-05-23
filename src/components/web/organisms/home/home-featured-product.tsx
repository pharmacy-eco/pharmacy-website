import React from "react";
import NextImg from "../../atoms/next-img";
import CardProduct from "../../atoms/card-atom/card-product";
import { IProduct } from "@/types/web/common";

interface IProps {
  products: Array<IProduct>;
}

const HomeFeaturedProduct: React.FC<IProps> = ({ products }) => {
  return (
    <div className="pt-14 pb-6 relative">
      <div className="absolute w-auto h-auto left-1/2 top-0 -translate-x-1/2">
        <NextImg width={320} height={40} alt="Long Châu" src="/assets/icons/TOP_96c725129f.webp" />
        <h2 className="absolute w-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm md:text-lg text-white font-medium text-center">
          Sản phẩm bán chạy
        </h2>
      </div>
      <div className="grid gap-5 grid-cols-12">
        {products.map((x, idx) => {
          return (
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <CardProduct key={idx} item={x} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

HomeFeaturedProduct.displayName = "HomeFeaturedProduct";
export default HomeFeaturedProduct;
