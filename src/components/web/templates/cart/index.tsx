"use client";
import { useCartStore } from "@/stores/cart";
import React, { useState } from "react";
import ListProducts from "../../molecules/cart/list-products";
import ActionCart from "../../molecules/cart/action-cart";
import OrderForm from "../../molecules/cart/order-form";
import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import { IPayloadOrder, PaymentMethodEnum } from "@/types/web/cart";
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
    payment_method: PaymentMethodEnum.CASH,
    bankCode: "",
    note: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: PaymentMethodEnum) => {
    setFormData((prev: any) => ({
      ...prev,
      payment_method: value,
      bankCode: value === PaymentMethodEnum.VNPAY ? prev.bankCode : ""
    }));
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
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      payment_method: formData.payment_method,
      ...(formData.bankCode ? { bankCode: formData.bankCode } : {}),
      cart: cart.map((item) => ({
        quantity: item.quantity,
        product_id: item.id,
        price: item.current_price
      }))
    };
    _sendFormOrder(payload)
      .then((res) => {
        const responseCode = "error" in res ? res.error?.code : 200;

        if (responseCode && responseCode >= 200 && responseCode < 300) {
          const orderPayment = "data" in res ? res.data : res;
          const paymentUrl = orderPayment?.payment_url;
          const orderSuccessParams = new URLSearchParams();

          if (orderPayment?.order_code) orderSuccessParams.set("order_code", orderPayment.order_code);
          orderSuccessParams.set("payment_method", orderPayment?.payment_method || formData.payment_method);
          orderSuccessParams.set("payment_status", orderPayment?.payment_status || "PENDING");

          sonner({
            type: "success",
            message: "Đặt hàng thành công!"
          });

          if (formData.payment_method === PaymentMethodEnum.VNPAY && paymentUrl) {
            window.location.assign(paymentUrl);
            return;
          }

          clearCart();
          window.location.assign(`/dat-hang-thanh-cong?${orderSuccessParams.toString()}`);
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
            {order && (
              <OrderForm
                formData={formData}
                onChange={handleChange}
                onPaymentMethodChange={handlePaymentMethodChange}
              />
            )}
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
