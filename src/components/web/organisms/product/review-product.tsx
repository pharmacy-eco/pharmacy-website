"use client";
import { Label } from "@/components/ui/label";
import { Review } from "@/types/web/product";
import React from "react";
import RatingProduct from "../../molecules/product/product-comment";
import CommentProduct from "../../molecules/product/product-reviews";
interface IProps {
  reviews: Review[];
}
const ReviewProduct = ({ reviews }: IProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl mb-6">
      <div className="border-b pb-2 w-full">
        <Label id="reviews-product" className="text-xl">
          Đánh giá sản phẩm ({reviews.length} đánh giá)
        </Label>
      </div>
      <div className="md:mx-2">
        <RatingProduct reviews={reviews} />
        <CommentProduct reviews={reviews} />
      </div>
    </div>
  );
};

ReviewProduct.displayName = "ReviewProduct";
export default ReviewProduct;
