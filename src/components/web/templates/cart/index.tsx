"use client";
import { useCartStore } from "@/stores/cart";
import React, { useState } from "react";
import ListProducts from "../../molecules/cart/list-products";
import ActionCart from "../../molecules/cart/action-cart";
import OrderForm from "../../molecules/cart/order-form";
import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import { IPayloadOrder } from "@/types/web/cart";
import sonner from "@/components/cms/atoms/sonner-atom";
import common from "@/enums/common-text";

interface IProps {}

const TCart: React.FC<IProps> = () => {
  const { cart, updateQuantity, removeFromCart, _sendFormOrder, clearCart } = useCartStore();
  const [order, setOrder] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const current_price = cart.reduce((sum, item) => sum + item.current_price * item.quantity, 0);
  const [formData, setFormData] = useState<any>({
    name: "",
    address: "",
    phone: "",
    email: "",
    note: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      sonner({
        type: "error",
        message: "Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Số điện thoại, Địa chỉ)!"
      });
      return;
    }
    setLoading(true);
    const payload: IPayloadOrder = {
      ...formData,
      cart: cart.map((item) => ({
        quantity: item.quantity,
        product_id: item.id,
        price: item.current_price
      }))
    };
    _sendFormOrder(payload)
      .then((res) => {
        if (res.error.code >= 200 && res.error.code < 300) {
          sonner({
            type: "success",
            message: "Đặt hàng thành công!"
          });
          clearCart();
        } else {
          sonner({
            type: "error",
            message: common["error.sonner.500"]
          });
        }
      })
      .finally(() => {
        setLoading(false);
        setOrder(false);
      });
  };

  return (
    <div className="w-full h-auto">
      <div className="container">
        <div className="py-4">
          <BreadcrumbAtom
            list={[
              {
                label: "Trang Chủ",
                href: "/"
              },
              {
                label: "Giỏ Hàng",
                href: "/gio-hang"
              }
            ]}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="w-full lg:w-8/12">
            <ListProducts carts={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} order={order} />
            {order && <OrderForm formData={formData} onChange={handleChange} />}
          </div>
          <div className="w-full lg:w-4/12">
            <ActionCart
              total={total}
              price={price}
              loading={loading}
              current_price={current_price}
              order={order}
              setOrder={setOrder}
              submit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TCart.displayName = "TCart";
export default TCart;
