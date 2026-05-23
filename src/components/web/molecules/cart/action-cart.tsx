"use client";
import React from "react";
import { formatNumber } from "@/utils/validate";
import ButtonRoot from "@/components/cms/atoms/button-atom/button-root";
import Link from "next/link";

interface IProps {
  total: number;
  price: number;
  current_price: number;
  order: boolean;
  loading: boolean;
  setOrder: (val: boolean) => void;
  submit: () => void;
}

const ActionCart: React.FC<IProps> = ({ total, price, current_price, order, loading, setOrder, submit }: IProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl h-fit">
      <h3 className="text-sm font-medium mb-2 px-2 py-1 text-blue-500 bg-blue-100 rounded-sm">
        Áp dụng ưu đãi để được giảm giá
      </h3>
      <div className="flex justify-between text-sm border-b py-2">
        <span>Số lượng</span>
        <span>{total}</span>
      </div>
      <div className="flex justify-between text-sm border-b py-2">
        <span>Tổng tiền</span>
        <span>{price.toLocaleString()}đ</span>
      </div>
      <div className="flex justify-between text-sm border-b py-2">
        <span>Giảm giá trực tiếp</span>
        <span>{formatNumber(price - current_price)}đ</span>
      </div>

      <div className="flex justify-between text-base font-semibold py-2">
        <span>Thành tiền</span>
        <span className="text-blue-500 text-lg">{current_price.toLocaleString()}đ</span>
      </div>
      {!order ? (
        <ButtonRoot
          disabled={!total}
          onClick={() => setOrder(true)}
          className="w-full bg-blue-600 text-white rounded-3xl py-2 mt-4 hover:bg-blue-700 transition"
        >
          Xác nhận thông tin
        </ButtonRoot>
      ) : (
        <div className="">
          <ButtonRoot
            onClick={submit}
            loading={loading}
            variant="solid"
            className="w-full bg-blue-600 text-white rounded-3xl py-2 mt-4 hover:bg-blue-700 transition"
          >
            Đặt hàng
          </ButtonRoot>
          <ButtonRoot
            variant="outline"
            onClick={() => setOrder(false)}
            className="text-blue-700 rounded-3xl py-2 mt-4 hover:bg-blue-100 transition w-full"
          >
            Quay lại
          </ButtonRoot>
        </div>
      )}

      <p className="text-xs text-gray-500 my-4 text-center">
        Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
        <Link href="/" className="underline">
          Điều khoản dịch vụ
        </Link>{" "}
        và{" "}
        <Link className="underline" href="/">
          Chính sách xử lý dữ liệu cá nhân
        </Link>
      </p>
    </div>
  );
};

ActionCart.displayName = "ActionCart";
export default ActionCart;
