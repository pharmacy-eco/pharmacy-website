import { ICartItem } from "@/types/web/cart";
import Image from "next/image";
import React from "react";
import InputNumber from "../../atoms/next-input/input-number";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";

interface IProps {
  carts: ICartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  order: boolean;
}

const ListProducts: React.FC<IProps> = ({ carts, order, updateQuantity, removeFromCart }: IProps) => {
  return (
    <div className=" bg-white p-4 rounded-2xl pb-12">
      <h2 className="font-semibold text-lg pb-2 border-b">Giỏ hàng của bạn</h2>
      {carts.length > 0 ? (
        carts.map((item) => (
          <div key={item.id} className="md:flex items-center border-b py-4 gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={item.image || "/default.jpg"}
                alt={item.name}
                width={64}
                height={64}
                className="rounded object-cover border p-1"
                unoptimized={(item.image || "").startsWith("http")}
              />
              <div className="flex-1">
                <p className="font-normal text-sm">{item.name}</p>
              </div>
            </div>
            <div className="flex items-center mt-2 justify-between w-full md:w-auto">
              <div className="text-blue-600 font-semibold w-28 text-right">{item.price.toLocaleString()}đ</div>
              <div className="flex items-center rounded px-2 mx-4">
                {!order ? (
                  <InputNumber
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  />
                ) : (
                  <span className="flex items-center">
                    <DynamicIcon name="x" size={14} color="#2563eb" />
                    {item.quantity}
                  </span>
                )}
              </div>
              {!order && (
                <div className="text-red-500 cursor-pointer px-2" onClick={(e) => removeFromCart(item.id)}>
                  <DynamicIcon name="trash" size={20} color="red" />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="my-4 text-center">Không có sản phẩm nào</div>
      )}
    </div>
  );
};

ListProducts.displayName = "ListProducts";
export default ListProducts;
