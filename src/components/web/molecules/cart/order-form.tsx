"use client";
import { NextInput } from "@/components/cms/atoms/next-input";
import { NextTextarea } from "../../atoms/next-textarea";
import SelectField from "@/components/cms/atoms/select-atom/select-field";
import { PaymentMethodEnum } from "@/types/web/cart";

interface IProps {
  formData: any;
  onChange: (data: any) => void;
  onPaymentMethodChange: (value: PaymentMethodEnum) => void;
}

const PAYMENT_METHOD_OPTIONS = [
  {
    label: "Tiền mặt",
    value: PaymentMethodEnum.CASH
  },
  {
    label: "VNPAY",
    value: PaymentMethodEnum.VNPAY
  }
];

const OrderForm = ({ formData, onChange, onPaymentMethodChange }: IProps) => {
  return (
    <div className="my-4 bg-white p-4 rounded-2xl shadow">
      <div>
        <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
          <span>Thông tin đặt hàng</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <NextInput
            type="text"
            name="name"
            placeholder="Họ và tên người đặt"
            value={formData.name}
            onChange={onChange}
            className=""
          />
          <NextInput
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={onChange}
            className=""
          />
        </div>
        <NextInput
          type="email"
          name="email"
          placeholder="Email (không bắt buộc)"
          value={formData.email}
          onChange={onChange}
          className=" mt-3"
        />
        <div className="mt-3">
          <SelectField
            name="payment_method"
            label="Phương thức thanh toán"
            value={formData.payment_method}
            options={PAYMENT_METHOD_OPTIONS}
            placeholder="Chọn phương thức thanh toán"
            onValueChange={(value) => onPaymentMethodChange(value as PaymentMethodEnum)}
          />
          {formData.payment_method === PaymentMethodEnum.VNPAY && (
            <NextInput
              type="text"
              name="bankCode"
              placeholder="Mã ngân hàng VNPAY (không bắt buộc)"
              value={formData.bankCode}
              onChange={onChange}
              className="mt-3"
            />
          )}
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-3 mt-3">
          <NextTextarea name="address" placeholder="Địa chỉ" value={formData.address} onChange={onChange} />
        </div>
        <div className="grid grid-cols-1 gap-3 mt-3">
          <NextTextarea
            name="note"
            placeholder="Ghi chú (không bắt buộc)"
            value={formData.note}
            onChange={onChange}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
