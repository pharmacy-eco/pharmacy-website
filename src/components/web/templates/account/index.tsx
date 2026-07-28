"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ButtonRoot from "@/components/web/atoms/button-atom/button-root";
import BreadcrumbAtom from "@/components/web/atoms/breadcrumb-atom";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import InputField from "@/components/web/atoms/next-input/input-field";
import { cn } from "@/lib/utils";

type AccountPage = "orders" | "profile";

type ProfileFormState = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
};

type StoredUser = {
  fullname?: string;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  address?: string;
};

interface AccountShellProps {
  active: AccountPage;
  title: string;
  description: string;
  children: React.ReactNode;
}

const USER_STORAGE_KEY = "user";

const initialProfileForm: ProfileFormState = {
  name: "",
  phone: "",
  email: "",
  birthday: "",
  address: ""
};

const normalizeDateInput = (date?: string) => {
  if (!date) return "";
  return date.includes("T") ? date.split("T")[0] : date;
};

const getStoredUser = (): StoredUser | null => {
  const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as StoredUser;
  } catch {
    return null;
  }
};

const accountMenu = [
  {
    label: "Đơn hàng",
    href: "/don-hang",
    icon: "package-check",
    value: "orders"
  },
  {
    label: "Quản lý thông tin cá nhân",
    href: "/thong-tin-ca-nhan",
    icon: "user-cog",
    value: "profile"
  }
] as const;

const AccountShell: React.FC<AccountShellProps> = ({ active, title, description, children }) => {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    setAccountName(user?.fullname || user?.name || user?.username || user?.phone || "");
  }, []);

  return (
    <main className="bg-blue-ea">
      <div className="container py-6 md:py-8">
        <BreadcrumbAtom
          list={[
            {
              label: "Trang Chủ",
              href: "/"
            },
            {
              label: title
            }
          ]}
        />
        <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-lg bg-white p-3 shadow">
            <div className="mb-3 flex items-center gap-3 rounded-lg bg-blue-ea p-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-12 text-white">
                <DynamicIcon name="user-round" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-12">{accountName || "Tài khoản"}</p>
                <p className="text-xs text-black-02">Khách hàng Medicare</p>
              </div>
            </div>
            <nav className="space-y-1">
              {accountMenu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    active === item.value
                      ? "bg-blue-12 text-white"
                      : "text-black-4a hover:bg-blue-ea hover:text-blue-12"
                  )}
                >
                  <DynamicIcon name={item.icon} className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
          <section className="rounded-lg bg-white p-4 shadow md:p-6">
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-blue-12 md:text-2xl">{title}</h1>
              <p className="mt-1 text-sm text-black-02">{description}</p>
            </div>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
};

const OrdersTemplate = () => {
  return (
    <AccountShell active="orders" title="Đơn hàng" description="Kiểm tra trạng thái các đơn hàng đã đặt tại nhà thuốc.">
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-blue-12/25 bg-blue-ea px-4 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-12 shadow-sm">
          <DynamicIcon name="package-open" className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-blue-12">Chưa có đơn hàng</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-black-02">
          Sau khi đặt hàng, thông tin đơn hàng sẽ hiển thị tại đây để bạn tiện theo dõi.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-blue-12 px-5 text-sm font-medium text-white"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    </AccountShell>
  );
};

const ProfileTemplate = () => {
  const [form, setForm] = useState<ProfileFormState>(initialProfileForm);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    if (!user) return;

    setForm({
      name: user.fullname || user.name || "",
      phone: user.phone || user.username || "",
      email: user.email || "",
      birthday: normalizeDateInput(user.birthday),
      address: user.address || ""
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentUser = getStoredUser() || {};

    window.localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({
        ...currentUser,
        fullname: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        birthday: form.birthday,
        address: form.address.trim()
      })
    );
    setMessage("Thông tin đã được lưu tạm trên trình duyệt. Bạn có thể nối API lưu hồ sơ ở bước tiếp theo.");
  };

  return (
    <AccountShell
      active="profile"
      title="Quản lý thông tin cá nhân"
      description="Cập nhật thông tin liên hệ dùng cho đặt hàng và nhận tư vấn."
    >
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <InputField
          name="name"
          label="Họ và tên"
          placeholder="Nhập họ và tên"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
        />
        <InputField
          name="phone"
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          autoComplete="tel"
          inputMode="tel"
          value={form.phone}
          onChange={handleChange}
        />
        <InputField
          name="email"
          type="email"
          label="Email"
          placeholder="Nhập email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
        />
        <InputField name="birthday" type="date" label="Ngày sinh" value={form.birthday} onChange={handleChange} />
        <div className="md:col-span-2">
          <InputField
            name="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ nhận hàng"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center">
          <ButtonRoot type="submit">
            <DynamicIcon name="save" className="h-5 w-5" />
            <span>Lưu thông tin</span>
          </ButtonRoot>
          {message && <p className="text-sm text-blue-12">{message}</p>}
        </div>
      </form>
    </AccountShell>
  );
};

export { OrdersTemplate, ProfileTemplate };
