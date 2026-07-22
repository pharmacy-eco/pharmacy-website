import { PaymentMethodEnum } from "./cart";

export interface ICancelPaymentPayload {
  orderCode: string;
}

export interface ICancelPaymentData {
  order_code: string;
  payment_method: PaymentMethodEnum;
  payment_status: "FAILURE";
  transaction_id: number;
  transaction_status: "FAILURE";
  already_cancelled: boolean;
}

export interface ICancelPaymentResponse {
  requestId: string;
  at: string;
  error: {
    code: number;
    message: string;
  };
  data: ICancelPaymentData;
}
