import { IRequestPagination } from "@/types/cms/request";
import { IResponseCommon, IResponseData, IResponsePagination } from "@/types/cms/response";

type ProductionBatchStatus = 1 | 2;

interface IProductionBatch {
  id: number;
  name: string;
  manufacturing_date: string;
  expiration_date: string;
  quantity: number;
  production_place: string;
  status: ProductionBatchStatus;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

type IProductionBatchPayload = Pick<
  IProductionBatch,
  "name" | "manufacturing_date" | "expiration_date" | "quantity" | "production_place" | "status"
>;

interface IProductionBatchFilter {
  name?: string;
  status?: ProductionBatchStatus;
}

type ProductionBatchSortField =
  | "id"
  | "name"
  | "manufacturing_date"
  | "expiration_date"
  | "quantity"
  | "production_place"
  | "status"
  | "created_at"
  | "updated_at";

interface IProductionBatchSort {
  field: ProductionBatchSortField;
  order: "asc" | "desc";
}

type IProductionBatchResponse = IResponseData<IProductionBatch>;
type IProductionBatchListResponse = IResponsePagination<IProductionBatch>;
type IProductionBatchDeleteResponse = IResponseCommon;
type IProductionBatchRequest = IRequestPagination<IProductionBatchFilter>;

export type {
  IProductionBatch,
  IProductionBatchDeleteResponse,
  IProductionBatchFilter,
  IProductionBatchListResponse,
  IProductionBatchPayload,
  IProductionBatchRequest,
  IProductionBatchResponse,
  IProductionBatchSort,
  ProductionBatchSortField,
  ProductionBatchStatus
};
