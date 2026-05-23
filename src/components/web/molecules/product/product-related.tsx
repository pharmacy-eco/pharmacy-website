"use client";
import React from "react";
import CardProduct from "../../atoms/card-atom/card-product";
import CardFeatured from "../../atoms/card-atom/card-featured";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import { IProductRecomment } from "@/types/web/product";

interface IProps {
  data: IProductRecomment[];
}

const RelatedProduct: React.FC<IProps> = ({ data }) => {
  return (
    <CardFeatured title="Sản phẩm liên quan" className="">
      <SliderRoot
        dots={false}
        gap="lg"
        infinite={false}
        slidesToShow={5}
        isBtnCenter
        centerMode={false}
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
        {data?.map((x, idx) => {
          return (
            <div key={idx} className="col-span-6 md:col-span-3 lg:col-span-2 h-[460px]">
              <CardProduct item={x as any} />
            </div>
          );
        })}
      </SliderRoot>
    </CardFeatured>
  );
};

RelatedProduct.displayName = "RelatedProduct";
export default RelatedProduct;
