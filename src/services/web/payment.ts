import { http } from "@/lib/http";
import { ICancelPaymentPayload, ICancelPaymentResponse } from "@/types/web/payment";

const fnCancelPayment = async (payload: ICancelPaymentPayload): Promise<ICancelPaymentResponse> => {
  return await http.post<ICancelPaymentPayload, ICancelPaymentResponse>("/web/payment/cancel", payload);
};

const PaymentService = {
  fnCancelPayment
};

export default PaymentService;
