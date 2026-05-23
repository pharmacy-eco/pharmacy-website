"use client";
import React, { useState } from "react";
import ProductInfo from "../../molecules/product/product-info";
import ProductImage from "../../molecules/product/product-image";
import ProductAction from "../../molecules/product/product-action";
import ProductDescription from "../../molecules/product/product-description";
import RelatedProduct from "../../molecules/product/product-related";
import { useCartStore } from "@/stores/cart";
import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import { IProduct } from "@/types/web/product";
import ReviewProduct from "../../organisms/product/review-product";
import ReviewForm from "../../molecules/reviews/review-form";

interface IProps {
  product: IProduct;
}

const TProduct: React.FC<IProps> = ({ product }: IProps) => {
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const breadcrumb = [
    {
      label: "Trang Chủ",
      href: "/"
    },
    {
      label: product?.category[0].name || "",
      href: `/${product?.category[0].slug}` || ""
    },
    {
      label: product?.name || "",
      href: product?.slug || ""
    }
  ];
  return (
    <div className="w-full h-auto">
      <div className="container">
        <div className="py-4">
          <BreadcrumbAtom list={breadcrumb} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-9 gap-8 bg-white rounded-2xl p-6">
          <ProductImage images={product?.productImage} />
          <div className="md:col-span-5 gap-2">
            <ProductInfo product={product} />
            <ProductAction
              quantity={quantity}
              onChange={(val: number) => setQuantity(val)}
              onSave={() => {
                addToCart({
                  id: product.id,
                  name: product.name,
                  image: product.productImage?.[0]?.url ?? "",
                  price: product.price,
                  current_price: product.current_price,
                  quantity
                });
                setQuantity(1);
              }}
            />
          </div>
        </div>
        <div className="bg-white my-6 rounded-2xl p-6">
          <p className="w-full text-xl font-semibold mb-4">Mô tả sản phẩm</p>
          <ProductDescription content={product?.content} />
        </div>
        <div className="pb-10">
          <RelatedProduct data={product.product_recomment || []} />
        </div>
        <div className="">
          <ReviewProduct reviews={product.reviews} />
        </div>
      </div>
      <ReviewForm
        product={{
          id: product.id,
          name: product.name,
          img: product.productImage?.[0]?.url || ""
        }}
      />
    </div>
  );
};

TProduct.displayName = "TProduct";
export default TProduct;
