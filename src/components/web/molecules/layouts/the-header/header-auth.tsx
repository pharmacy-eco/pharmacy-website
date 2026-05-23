"use client";

import React, { useEffect, useState } from "react";
import ButtonRoot from "@/components/web/atoms/button-atom/button-root";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "next/navigation";
import HeaderCart from "./header-cart";

interface IProps {}

const HeaderAuth: React.FC<IProps> = () => {
  const router = useRouter();
  const [isCLient, setCLient] = useState(false);

  const handleCart = () => {
    router.push("/gio-hang");
  };

  useEffect(() => {
    setCLient(true);
  }, []);

  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const totalQuantity = useCartStore((state) => state.cart.length);
  return (
    <div className="flex gap-3 items-center">
      {/* <ButtonRoot
        variant="outline"
        size="larger"
        className="w-10 h-10 md:w-auto md:h-[50px] p-0 md:px-6 inline-flex items-center hover:bg-white"
        onClick={handleLogin}
      >
        <DynamicIcon name="user-round" size="20" className="w-4 h-4 md:w-5 md:h-5" />
        <span className="hidden md:inline-block pl-2">Đăng nhập</span>
      </ButtonRoot> */}
      <div className="group relative" onMouseEnter={() => setCartOpen(true)}>
        <ButtonRoot
          size="larger"
          className="w-10 h-10 md:w-auto md:h-[50px] p-0 md:px-6 inline-flex items-center "
          onClick={handleCart}
        >
          <DynamicIcon name="shopping-cart" size="20" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden md:inline-block pl-2">Giỏ hàng</span>
          {isCLient && totalQuantity > 0 && (
            <div className="absolute -top-[4px] -right-[4px] bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
              {totalQuantity}
            </div>
          )}
        </ButtonRoot>
        <HeaderCart />
      </div>
    </div>
  );
};

HeaderAuth.displayName = "HeaderAuth";
export default HeaderAuth;
