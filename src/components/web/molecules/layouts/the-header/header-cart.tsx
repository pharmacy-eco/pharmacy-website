"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cart";
import Image from "next/image";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";

interface IProps {}

const HeaderCart: React.FC<IProps> = () => {
  const { cart, removeFromCart, setCartOpen, isCartOpen } = useCartStore();
  const cartRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); //
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Hủy timeout nếu chuột quay lại
    }
    setCartOpen(true); // Mở giỏ hàng
  };

  const handleMouseLeave = () => {
    // Đặt timeout để đóng giỏ hàng sau 2 giây
    timeoutRef.current = setTimeout(() => {
      setCartOpen(false);
    }, 1000);
  };

  useEffect(() => {
    if (isCartOpen) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCartOpen(false);
      }, 2000);
    }
  }, [isCartOpen]);

  useEffect(() => {
    // Cleanup khi component bị unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return (
    isCartOpen && (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cartRef}
        className="w-[400px] absolute z-20 right-0 bottom-0 translate-y-full ease-in-out p-4 rounded-xl bg-white shadow-2xl transition-all duration-200"
      >
        <Label className="flex justify-start text-blue-600 text-left font-medium text-base">Giỏ hàng</Label>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center py-2 gap-4">
            <Image
              src={item.image || "/default.jpg"}
              alt={item.name}
              width={64}
              height={64}
              className="rounded object-cover border p-1"
            />
            <div className="text-gray-800 text-left">
              <Label className="font-normal text-sm text-wrap line-clamp-2">{item.name}</Label>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-1">
                  <div className="text-blue-600 font-semibold text-right">{item.current_price.toLocaleString()}đ</div>
                  <span className="flex items-center">
                    <DynamicIcon name="x" size={14} color="#2563eb" />
                    {item.quantity}
                  </span>
                </div>
                <div className="text-red-500 cursor-pointer px-2" onClick={(e) => removeFromCart(item.id)}>
                  <DynamicIcon name="trash" size={20} color="red" />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-2">
          <Label>{cart.length} sản phẩm</Label>
          <Link href="/gio-hang" className="bg-blue-600 text-white px-4 py-2 rounded-2xl text-sm">
            Xem giỏ hàng
          </Link>
        </div>
      </div>
    )
  );
};

HeaderCart.displayName = "HeaderCart";
export default HeaderCart;
