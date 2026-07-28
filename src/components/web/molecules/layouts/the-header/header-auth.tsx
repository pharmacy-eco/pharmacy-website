"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ButtonRoot from "@/components/web/atoms/button-atom/button-root";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import { useCartStore } from "@/stores/cart";
import { usePathname, useRouter } from "next/navigation";
import HeaderCart from "./header-cart";
import { E_KEY_COOKIE } from "@/enums/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface IProps {}

type HeaderUser = {
  fullname?: string;
  username?: string;
  phone?: string;
};

const USER_STORAGE_KEY = "user";

const HeaderAuth: React.FC<IProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCLient, setCLient] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(null);

  const userName = user?.fullname || user?.username || user?.phone;

  const handleCart = () => {
    router.push("/gio-hang");
  };

  useEffect(() => {
    const token = window.localStorage.getItem(E_KEY_COOKIE.access_token);
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setCLient(true);
  }, [pathname]);

  const setCartOpen = useCartStore((state) => state.setCartOpen);
  const totalQuantity = useCartStore((state) => state.cart.length);
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtonRoot
            variant="outline"
            size="medium"
            className="h-10 w-10 p-0 hover:bg-white md:h-11 md:w-auto md:px-4"
          >
            <DynamicIcon name="user-round" size="20" className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden max-w-36 truncate pl-2 md:inline-block">{userName || "Tài khoản"}</span>
          </ButtonRoot>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 rounded-2xl border-none p-3 shadow-xl">
          <div className="rounded-xl bg-blue-ea p-3">
            <p className="text-sm font-semibold text-blue-12">Xin chào{userName ? `, ${userName}` : "!"}</p>
            <p className="mt-1 text-xs text-black-02">
              {userName
                ? "Theo dõi đơn hàng và cập nhật thông tin cá nhân của bạn."
                : "Đăng nhập để theo dõi đơn hàng và cập nhật thông tin cá nhân."}
            </p>
            {!userName && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/dang-nhap"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-blue-12 text-sm font-medium text-white"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-blue-12 bg-white text-sm font-medium text-blue-12"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          <DropdownMenuSeparator className="my-3" />
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-3">
            <Link href="/don-hang" className="flex items-center gap-3">
              <DynamicIcon name="package-check" className="h-5 w-5 text-blue-12" />
              <span className="font-medium">Đơn hàng</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl px-3 py-3">
            <Link href="/thong-tin-ca-nhan" className="flex items-center gap-3">
              <DynamicIcon name="user-cog" className="h-5 w-5 text-blue-12" />
              <span className="font-medium">Quản lý thông tin cá nhân</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="group relative" onMouseEnter={() => setCartOpen(true)}>
        <ButtonRoot size="medium" className="h-10 w-10 p-0 md:h-11 md:w-auto md:px-4" onClick={handleCart}>
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
