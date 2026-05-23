"use client";
import React from "react";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import ButtonRoot from "../../atoms/button-atom/button-root";
import InputNumber from "../../atoms/next-input/input-number";
import { useCartStore } from "@/stores/cart";

interface IProps {
  quantity: number;
  onChange: (val: number) => void;
  onSave: () => void;
}
const items = [
  {
    id: 1,
    icon: "package",
    title: "ĐỔI TRẢ TRONG 30 NGÀY",
    description: "đa dạng và chuyên sâu"
  },
  {
    id: 2,
    icon: "shield-check",
    title: "CAM KẾT 100%",
    description: "đa dạng và chuyên sâu"
  },
  {
    id: 3,
    icon: "ambulance",
    title: "MIỄN PHÍ VẬN CHUYỂN",
    description: "đa dạng và chuyên sâu"
  }
];

const ProductAction: React.FC<IProps> = ({ quantity, onChange, onSave }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onChange(val);
    }
  };
  const { setCartOpen } = useCartStore();

  return (
    <div className="">
      <div className="flex items-center gap-4 mt-8 text-sm font-normal">
        <span>Chọn số lượng</span>
        <InputNumber type="number" value={quantity} onChange={handleChange} />
      </div>
      <div className="flex items-center gap-4 mt-6">
        <ButtonRoot
          onClick={() => {
            onSave();
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
            setCartOpen(true);
          }}
          variant="solid"
          className="border px-4 h-14 rounded-full w-1/2 text-lg"
        >
          Chọn mua
        </ButtonRoot>
        <ButtonRoot
          variant="outline"
          className="border px-4 h-14 rounded-full bg-[#eaeffa] border-none w-1/2 text-lg hover:bg-[#eaeffa"
        >
          Tìm nhà thuốc
        </ButtonRoot>
      </div>
      <div className="grid grid-cols-12 py-6">
        {items.map((x, idx) => {
          return (
            <div
              key={idx}
              className="col-span-12 md:col-span-4 w-full h-auto px-1 py-6 flex gap-2 items-center justify-center border-t border-blue-200"
            >
              <div className="inline-flex items-center justify-center">
                <DynamicIcon name={x.icon} className="w-8 h-8 stroke-blue-12" />
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-xs font-semibold text-left text-blue-12 m-0 p-0">{x.title}</p>
                <p className="text-xs font-normal text-left text-black-02 m-0 p-0">{x.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProductAction.displayName = "ProductAction";
export default ProductAction;
