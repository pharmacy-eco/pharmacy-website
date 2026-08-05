"use client";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";
import { Review } from "@/types/web/product";
import { formatDate } from "@/utils/validate";
import React from "react";
interface IProps {
  reviews: Review[];
}
const CommentProduct = ({ reviews }: IProps) => {
  return (
    <div className="mt-8">
      {reviews.map((review, index) => (
        <div className="flex items-start gap-2 md:gap-4 mb-6" key={index}>
          <div className="rounded-full min-w-10 min-h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-200">
            {review.name[0]}
          </div>
          <div className="">
            <div className="">
              <p className="text-base font-semibold block">{review.name}</p>
              <div className="flex items-center gap-1">
                {Array(review.star)
                  .fill(0)
                  .map((_, starIndex) => (
                    <DynamicIcon
                      key={starIndex}
                      fill="#eab308"
                      size={14}
                      name="star"
                      className="text-yellow-500"
                    />
                  ))}
              </div>
            </div>
            <p className="font-normal text-sm">{review.content}</p>
            <span className="font-normal text-gray-400 text-xs">
              {formatDate(review.created_at, "DD/MM/YYYY HH:mm")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

CommentProduct.displayName = "CommentProduct";
export default CommentProduct;
