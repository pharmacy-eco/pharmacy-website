import { IResponseData } from "./response";

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  current_price: number;
  quantity: number;
  image?: string;
}

export enum PaymentMethodEnum {
  CASH = "CASH",
  VNPAY = "VNPAY"
}

export interface ICartPayload {
  product_id: number;
  quantity: number;
  price: number;
}

export interface IPayloadOrder {
  name: string;
  address: string;
  phone: string;
  cart: ICartPayload[];
  email: string;
  payment_method?: PaymentMethodEnum;
  bankCode?: string;
}

export interface IOrderPaymentResponse {
  order_code: string;
  payment_method: PaymentMethodEnum;
  payment_status: string;
  payment_url?: string;
}

export type IOrderPaymentApiResponse = IResponseData<IOrderPaymentResponse> | IOrderPaymentResponse;
