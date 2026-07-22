"use client";

import React from "react";
import NextImg from "../next-img";
import ButtonRoot from "../button-atom/button-root";
import { IProduct } from "@/types/web/common";
import { formatNumber } from "@/utils/validate";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";

type CardProductItem = IProduct & {
  productImage?: {
    id: number;
    url: string;
  }[];
};

interface IProps {
  item: CardProductItem | null;
}

const CardProduct: React.FC<IProps> = ({ item }) => {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const productHref = item?.slug ? `/san-pham/${item.slug}` : "";
  const imageSrc = item?.thumbnail || item?.productImage?.[0]?.url || "";

  const handleOpenProduct = () => {
    if (!productHref) return;
    router.push(productHref);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleOpenProduct();
  };

  const handleBuyNow = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!item) return;

    addToCart({
      id: item.id,
      name: item.name,
      image: imageSrc,
      price: item.price || 0,
      current_price: item.current_price || 0,
      quantity: 1
    });
    setCartOpen(true);
  };

  return (
    <div
      role={productHref ? "link" : undefined}
      tabIndex={productHref ? 0 : undefined}
      onClick={handleOpenProduct}
      onKeyDown={handleCardKeyDown}
      className="w-full h-full flex flex-col bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-blue-1d cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-12"
    >
      <div className="w-full p-3 pb-0">
        <div className="w-full flex relative min-h-[200px]">
          <NextImg
            width={160}
            height={160}
            src={imageSrc}
            alt="Long Châu"
            className="absolute inset-0 w-full h-full  object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full justify-between px-3">
        <div className="flex flex-col">
          <div className="min-h-9 md:min-h-5"></div>
          <h3 className="text-sm text-black-02 font-medium line-clamp-2 md:line-clamp-3">
            {item?.name}
          </h3>
          <div className="flex flex-col gap-0 pt-4">
            <div className="flex gap-1 items-center">
              <span className="text-base font-semibold text-blue-12">
                {formatNumber(item?.current_price || 0) + "đ"}
              </span>
              <span className="text-sm text-blue-12">/</span>
              <span className="text-sm text-blue-12 font-normal">Hộp</span>
            </div>
            <span className="text-sm text-[#4a4f63] line-through">{formatNumber(item?.price || 0) + "đ"}</span>
            {/* <p className="w-max inline-flex px-2 py-1 mt-1 text-[13px] text-[#4a4f63] bg-[#edf0f3] rounded-md">
              Hộp 120 viên
            </p> */}
          </div>
        </div>
        <div className="pt-6 pb-3">
          <ButtonRoot type="button" className="w-full h-9" onClick={handleBuyNow}>
            Mua ngay
          </ButtonRoot>
        </div>
      </div>
    </div>
  );
};

CardProduct.displayName = "CardProduct";
export default CardProduct;
