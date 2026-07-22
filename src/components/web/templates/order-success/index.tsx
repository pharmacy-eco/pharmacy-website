"use client";

import PaymentService from "@/services/web/payment";
import { useCartStore } from "@/stores/cart";
import { CheckCircle2, CircleX, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface IProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const getSearchValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
};

const paymentMethodLabels: Record<string, string> = {
  CASH: "Tiền mặt",
  VNPAY: "VNPAY"
};

const paymentStatusLabels: Record<string, string> = {
  PENDING: "Đang xử lý",
  PAID: "Đã thanh toán",
  FAILED: "Thanh toán thất bại"
};

const TOrderSuccess: React.FC<IProps> = ({ searchParams }) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const cancelRequestedRef = useRef(false);
  const responseCode = getSearchValue(searchParams.vnp_ResponseCode);
  const transactionStatus = getSearchValue(searchParams.vnp_TransactionStatus);
  const isVnpayReturn = !!responseCode || !!transactionStatus;
  const isSuccess = !isVnpayReturn || (responseCode === "00" && (!transactionStatus || transactionStatus === "00"));
  const isCancelled = responseCode === "24";
  const orderCode = getSearchValue(searchParams.order_code) || getSearchValue(searchParams.vnp_TxnRef);
  const paymentMethod = getSearchValue(searchParams.payment_method) || (isVnpayReturn ? "VNPAY" : "CASH");
  const paymentStatus =
    getSearchValue(searchParams.payment_status) || (isVnpayReturn ? (isSuccess ? "PAID" : "FAILED") : "PENDING");
  const paymentMethodLabel = paymentMethodLabels[paymentMethod] || paymentMethod;
  const paymentStatusLabel = paymentStatusLabels[paymentStatus] || paymentStatus;

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [clearCart, isSuccess]);

  useEffect(() => {
    if (!isCancelled || !orderCode || cancelRequestedRef.current) return;

    cancelRequestedRef.current = true;
    void PaymentService.fnCancelPayment({ orderCode }).catch(() => undefined);
  }, [isCancelled, orderCode]);

  return (
    <div className="container py-10 md:py-16">
      <div className="mx-auto max-w-2xl bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm">
        <div className="flex justify-center">
          {isSuccess ? (
            <CheckCircle2 className="h-16 w-16 text-green-500" strokeWidth={1.8} />
          ) : (
            <CircleX className="h-16 w-16 text-red-500" strokeWidth={1.8} />
          )}
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-black-02">
          {isSuccess ? "Đặt hàng thành công" : "Thanh toán không thành công"}
        </h1>
        <p className="mt-2 text-sm text-[#657384]">
          {isSuccess
            ? "Cảm ơn bạn đã đặt hàng. Nhà thuốc sẽ sớm liên hệ để xác nhận đơn hàng."
            : isCancelled
              ? "Bạn đã huỷ giao dịch VNPAY. Giỏ hàng vẫn được giữ để bạn có thể thanh toán lại."
              : "Giao dịch VNPAY chưa hoàn tất. Bạn có thể quay lại giỏ hàng để kiểm tra và thanh toán lại."}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 text-left text-sm">
          {orderCode && (
            <div className="flex justify-between gap-4 rounded-lg bg-[#f6f8fb] px-4 py-3">
              <span className="text-[#657384]">Mã đơn hàng</span>
              <span className="font-semibold text-black-02">{orderCode}</span>
            </div>
          )}
          <div className="flex justify-between gap-4 rounded-lg bg-[#f6f8fb] px-4 py-3">
            <span className="text-[#657384]">Phương thức thanh toán</span>
            <span className="font-semibold text-black-02">{paymentMethodLabel}</span>
          </div>
          <div className="flex justify-between gap-4 rounded-lg bg-[#f6f8fb] px-4 py-3">
            <span className="text-[#657384]">Trạng thái thanh toán</span>
            <span className="font-semibold text-black-02">{paymentStatusLabel}</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
          <Link
            href="/gio-hang"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blue-600 bg-white px-5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Xem giỏ hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

TOrderSuccess.displayName = "TOrderSuccess";
export default TOrderSuccess;
