import { IResponseData } from "./response";

interface IDashboardProductExpiry {
  count_product_expiring_soon: number;
  count_product_valid: number;
  count_product_expired: number;
  count_product_missing_expiry: number;
}

interface IDashboardOrderStatus {
  status: number;
  label: string;
  count_order: number;
}

interface IDashboardTopSellingProduct {
  product_id: number | string;
  product_name: string;
  quantity: number;
  total_revenue: number;
}

interface IDashboardData {
  count_product: number;
  count_order: number;
  count_order_processing: number;
  total_revenue_recent: number;
  recent_days: number;
  expiring_soon_days: number;
  product_expiry: IDashboardProductExpiry;
  order_statuses: IDashboardOrderStatus[];
  top_selling_products: IDashboardTopSellingProduct[];
}

type IDashboardResponse = IResponseData<IDashboardData>;

export type {
  IDashboardProductExpiry,
  IDashboardOrderStatus,
  IDashboardTopSellingProduct,
  IDashboardData,
  IDashboardResponse
};
