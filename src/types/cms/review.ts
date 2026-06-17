import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

export class ReviewsListDto {
  id!: number;
  name!: string;
  content!: string;
  product_id!: number;
  product_name!: string;
  star!: number;
  status!: number;
  created_at!: string;
}

interface IReviewFilter {
  keyword?: string;
  status?: string;
}

type IReviewResponse = IResponseData<ReviewsListDto>;
type IReviewListResponse = IResponsePagination<ReviewsListDto>;
type IReviewRequest = IRequestPagination<IReviewFilter>;

export type { IReviewFilter, IReviewResponse, IReviewListResponse, IReviewRequest };
