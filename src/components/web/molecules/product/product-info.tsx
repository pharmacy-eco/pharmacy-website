"use client";
import React from "react";
import Link from "next/link";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import ButtonRoot from "../../atoms/button-atom/button-root";
import { IProduct } from "@/types/web/product";
import { formatNumber } from "@/utils/validate";

interface IProps {
  product: IProduct;
}

const ProductInfo: React.FC<IProps> = ({ product }: IProps) => {
  const totalStars = product.reviews.reduce((sum, review) => sum + review.star, 0);
  const averageStars = totalStars / product.reviews.length;
  return (
    <div className="">
      <p className="text-md">
        Thương hiệu: <span className="text-blue-600">Sanofi</span>
      </p>
      <h1 className="mt-4 text-xl font-semibold">{product.name}</h1>
      <div className="flex items-center gap-2 mt-2 text-md font-normal">
        <div className="flex items-center gap-2">
          {averageStars}
          <DynamicIcon size={16} name="star" fill="#eab308" className="stroke-yellow-1d text-yellow-500" />
        </div>
        <Link href={"#reviews-product"} className="text-blue-500">
          - {product.reviews.length} đánh giá
        </Link>
      </div>
      <div className="text-blue-600 text-3xl font-semibold mt-4">
        {product.current_price ? formatNumber(product.current_price) : 0}đ
        <span className="font-medium text-2xl">/Hộp</span>
      </div>
      {product.price && (
        <div className="line-through font-medium text-gray-400 text-xl mt-1">
          {product.price ? formatNumber(product.price) : 0}đ
        </div>
      )}
      <table className="w-full mt-2 hidden sm:table">
        <tbody>
          <tr className="text-start text-base">
            <td className="py-4 text-gray-700">Đơn vị tính</td>
            <td>
              {" "}
              <ButtonRoot variant="outline" className="border px-4 rounded-3xl hover:bg-gray-100">
                Hộp
              </ButtonRoot>
            </td>
          </tr>
          <tr className="text-start text-base">
            <td className="py-2 text-gray-700">Danh mục</td>
            <td>
              {" "}
              <Link href={product.category[0].slug} className="text-blue-500">
                {product.category[0].name}
              </Link>
            </td>
          </tr>
          {product.optionals.map((item, index) => (
            <tr key={index} className="text-start text-base py-4">
              <td className="float-start py-2 text-gray-700 w-[200px]">{item.name}</td>
              <td className="font-normal py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sm:hidden space-y-2 mt-2">
        <div className="text-base">
          <p className="text-gray-700 font-medium">Đơn vị tính</p>
          <ButtonRoot variant="outline" className="border px-4 rounded-3xl hover:bg-gray-100">
            Hộp
          </ButtonRoot>
        </div>
        <div className="text-base">
          <p className="text-gray-700 font-medium">Danh mục</p>
          <Link href={product.category[0].slug} className="text-blue-500">
            {product.category[0].name}
          </Link>
        </div>
        {product.optionals.map((item, index) => (
          <div key={index} className="text-base">
            <p className="text-gray-800 font-medium">{item.name}</p>
            <p className="font-normal text-sm text-gray-500">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-200 text-sm mx-3 text-gray-700 px-3 py-2 rounded-md mt-2">
        Lưu ý: đơn hàng sau 21:00 dự kiến sẽ giao từ 8:00 sáng mai
      </div>
    </div>
  );
};

ProductInfo.displayName = "ProductInfo";
export default ProductInfo;
