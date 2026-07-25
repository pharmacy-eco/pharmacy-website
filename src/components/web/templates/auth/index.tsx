"use client";

import React, { useState } from "react";
import Link from "next/link";
import ButtonRoot from "@/components/web/atoms/button-atom/button-root";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import InputField from "@/components/web/atoms/next-input/input-field";

type AuthMode = "login" | "register";

interface IProps {
  mode: AuthMode;
}

const authContent = {
  login: {
    title: "Đăng nhập",
    description: "Theo dõi đơn hàng, lưu thông tin nhận hàng và mua thuốc thuận tiện hơn.",
    submitLabel: "Đăng nhập",
    switchLabel: "Chưa có tài khoản?",
    switchAction: "Đăng ký ngay",
    switchHref: "/dang-ky"
  },
  register: {
    title: "Đăng ký",
    description: "Tạo tài khoản để quản lý đơn hàng và thông tin cá nhân tại nhà thuốc.",
    submitLabel: "Tạo tài khoản",
    switchLabel: "Đã có tài khoản?",
    switchAction: "Đăng nhập",
    switchHref: "/dang-nhap"
  }
} as const;

const AuthTemplate: React.FC<IProps> = ({ mode }) => {
  const content = authContent[mode];
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Màn hình đã sẵn sàng, bạn có thể kết nối API xác thực ở bước tiếp theo.");
  };

  return (
    <main className="bg-blue-ea">
      <div className="container py-8 md:py-12">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg bg-white shadow md:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-blue-12 p-6 text-white md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
              <DynamicIcon name="shield-check" className="h-6 w-6" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold md:text-3xl">{content.title}</h1>
            <p className="mt-3 text-sm leading-6 text-white/85">{content.description}</p>
            <div className="mt-8 space-y-4 text-sm text-white/90">
              <div className="flex items-center gap-3">
                <DynamicIcon name="package-check" className="h-5 w-5" />
                <span>Tra cứu và quản lý đơn hàng</span>
              </div>
              <div className="flex items-center gap-3">
                <DynamicIcon name="user-cog" className="h-5 w-5" />
                <span>Cập nhật thông tin cá nhân</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8">
            {mode === "register" && (
              <InputField name="name" label="Họ và tên" placeholder="Nhập họ và tên" autoComplete="name" />
            )}
            <InputField
              name="phone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              autoComplete="tel"
              inputMode="tel"
            />
            {mode === "register" && (
              <InputField name="email" type="email" label="Email" placeholder="Nhập email" autoComplete="email" />
            )}
            <InputField
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            {mode === "register" && (
              <InputField
                name="confirmPassword"
                type="password"
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
              />
            )}
            {mode === "login" && (
              <div className="flex justify-end">
                <Link href="/dang-nhap" className="text-sm font-medium text-blue-12 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            )}
            <ButtonRoot type="submit" size="larger" className="w-full">
              <DynamicIcon name={mode === "login" ? "log-in" : "user-plus"} className="h-5 w-5" />
              <span>{content.submitLabel}</span>
            </ButtonRoot>
            {message && <p className="rounded-lg bg-blue-ea px-3 py-2 text-sm text-blue-12">{message}</p>}
            <p className="text-center text-sm text-black-02">
              {content.switchLabel}{" "}
              <Link href={content.switchHref} className="font-semibold text-blue-12 hover:underline">
                {content.switchAction}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

AuthTemplate.displayName = "AuthTemplate";
export default AuthTemplate;
