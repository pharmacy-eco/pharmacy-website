"use client";
import { NextInput } from "@/components/cms/atoms/next-input";
import { NextTextarea } from "../../atoms/next-textarea";
interface IProps {
  formData: any;
  onChange: (data: any) => void;
}
const OrderForm = ({ formData, onChange }: IProps) => {
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
