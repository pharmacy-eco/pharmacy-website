import { IRequestPagination } from "@/types/cms/request";
import { IResponseData, IResponsePagination } from "@/types/cms/response";

interface IOrderDetailListDto {
  id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  total_price: number;
}

interface IOrdersListDto {
  id: number;
  name: string;
  email: string;
  code: string;
  phone: string;
  address: string;
  status: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  orderDetail: IOrderDetailListDto[];
}

interface IOrderFilter {
  keyword?: string;
  status?: string;
}

type IOrderResponse = IResponseData<IOrdersListDto>;
type IOrderListResponse = IResponsePagination<IOrdersListDto>;
type IOrderRequest = IRequestPagination<IOrderFilter>;

export type {
  IOrderDetailListDto,
  IOrdersListDto,
  IOrderFilter,
  IOrderResponse,
  IOrderListResponse,
  IOrderRequest
};
