"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ButtonRoot from "@/components/web/atoms/button-atom/button-root";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import InputField from "@/components/web/atoms/next-input/input-field";
import sonner from "@/components/web/atoms/sonner-atom";
import { E_KEY_COOKIE } from "@/enums/common";
import { parseExpiresIn, setCookie } from "@/lib/cookie";
import WebAuthService from "@/services/web/auth";
import { UserRegisterRequest } from "@/types/web/request";
import { isEmail, isMobilePhone, isNullOrEmpty } from "@/utils/validate";

type AuthMode = "login" | "register";

interface IProps {
  mode: AuthMode;
}

type AuthFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

const initialFormState: AuthFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: ""
};

const ACCESS_TOKEN_KEY = E_KEY_COOKIE.access_token;
const USER_STORAGE_KEY = "user";

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
  const router = useRouter();
  const content = authContent[mode];
  const [form, setForm] = useState<AuthFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormState, string>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const getErrorMessage = (error: unknown) => {
    const response = (error as { response?: { data?: { error?: { message?: string }; message?: string } } })?.response;
    return (
      response?.data?.error?.message ||
      response?.data?.message ||
      (error instanceof Error ? error.message : "Có lỗi xảy ra, vui lòng thử lại.")
    );
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof AuthFormState, string>> = {};
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (mode === "register" && isNullOrEmpty(form.name.trim())) {
      nextErrors.name = "Vui lòng nhập họ và tên";
    }

    if (isNullOrEmpty(phone)) {
      nextErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!isMobilePhone(phone)) {
      nextErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (mode === "register" && email && !isEmail(email)) {
      nextErrors.email = "Email không hợp lệ";
    }

    if (mode === "register" && isNullOrEmpty(form.address.trim())) {
      nextErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (isNullOrEmpty(form.password.trim())) {
      nextErrors.password = "Vui lòng nhập mật khẩu";
    }

    if (mode === "register") {
      if (isNullOrEmpty(form.confirmPassword.trim())) {
        nextErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
      } else if (form.password !== form.confirmPassword) {
        nextErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    const response = await WebAuthService.fnLogin({
      username: form.phone.trim(),
      password: form.password
    });
    const data = response?.data;

    if (!data?.access_token) {
      throw new Error(response?.error?.message || "Không nhận được token đăng nhập.");
    }

    window.localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.dataUser));
    setCookie(ACCESS_TOKEN_KEY, data.access_token, {
      expires: parseExpiresIn(data.expires_in)
    });

    sonner({
      type: "success",
      message: response?.error?.message || "Đăng nhập thành công"
    });
    router.replace("/");
  };

  const handleRegister = async () => {
    const payload: UserRegisterRequest = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      password: form.password
    };
    const email = form.email.trim();

    if (email) {
      payload.email = email;
    }

    const response = await WebAuthService.fnRegister(payload);

    sonner({
      type: "success",
      message: response?.error?.message || "Đăng ký thành công"
    });
    router.push("/dang-nhap");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      if (mode === "login") {
        await handleLogin();
      } else {
        await handleRegister();
      }
    } catch (error) {
      sonner({
        type: "error",
        message: getErrorMessage(error)
      });
    } finally {
      setLoading(false);
    }
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
              <InputField
                name="name"
                label="Họ và tên"
                placeholder="Nhập họ và tên"
                autoComplete="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
              />
            )}
            <InputField
              name="phone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              autoComplete="tel"
              inputMode="tel"
              value={form.phone}
              error={errors.phone}
              onChange={handleChange}
            />
            {mode === "register" && (
              <InputField
                name="email"
                type="email"
                label="Email"
                placeholder="Nhập email"
                autoComplete="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
            )}
            {mode === "register" && (
              <InputField
                name="address"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                autoComplete="street-address"
                value={form.address}
                error={errors.address}
                onChange={handleChange}
              />
            )}
            <InputField
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={form.password}
              error={errors.password}
              onChange={handleChange}
            />
            {mode === "register" && (
              <InputField
                name="confirmPassword"
                type="password"
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                autoComplete="new-password"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleChange}
              />
            )}
            {mode === "login" && (
              <div className="flex justify-end">
                <Link href="/dang-nhap" className="text-sm font-medium text-blue-12 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            )}
            <ButtonRoot type="submit" size="larger" className="w-full" loading={loading}>
              <DynamicIcon name={mode === "login" ? "log-in" : "user-plus"} className="h-5 w-5" />
              <span>{content.submitLabel}</span>
            </ButtonRoot>
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
