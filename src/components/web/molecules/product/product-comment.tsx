import ButtonRoot from "@/components/cms/atoms/button-atom/button-root";
import { Label } from "@/components/ui/label";
import { Review } from "@/types/web/product";
import React from "react";
import RateStar from "../../atoms/rate-star";
import { useReviewStore } from "@/stores/review";
interface IProps {
  reviews: Review[];
}
const RatingProduct = ({ reviews }: IProps) => {
  const { openReview } = useReviewStore();

  const starStats = Array.from({ length: 5 }, (_, i) => {
    const star = 5 - i;
    const count = reviews.filter((review) => review.star === star).length;
    const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  const averageRating = reviews.reduce((acc, review) => acc + review.star, 0) / reviews.length || 0;
  const averageStarCount = Math.round(averageRating);

  return (
    <div className="mt-4 flex gap-14">
      <div className="">
        <Label className="text-lg text-gray-600">Trung bình</Label>
        <div className="flex items-center gap-1">
          <RateStar rate={averageStarCount} ratio={0} quantity={0} isSummary />
        </div>
        <ButtonRoot variant="solid" className="border px-4 rounded-3xl mt-2" onClick={() => openReview()}>
          Gửi đánh giá
        </ButtonRoot>
      </div>
      <div className="">
        {starStats.map((item) => {
          return <RateStar key={item.star} rate={item.star} ratio={item.percentage} quantity={item.count} />;
        })}
      </div>
    </div>
  );
};

RatingProduct.displayName = "RatingProduct";
export default RatingProduct;
