"use client";

import * as React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { isNullOrEmpty } from "@/utils/validate";
import ButtonRoot from "@/components/cms/atoms/button-atom/button-root";
import AuthService from "@/services/cms/auth";
import { parseExpiresIn, setCookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";
import sonner from "@/components/cms/atoms/sonner-atom";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailErr("");
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordErr("");
  };

  const val = () => {
    let hasErr = false;

    if (isNullOrEmpty(email) || isNullOrEmpty(email.trim())) {
      hasErr = true;
      setEmailErr("Vui lòng nhập địa chỉ email");
    }

    if (isNullOrEmpty(password) || isNullOrEmpty(password.trim())) {
      hasErr = true;
      setPasswordErr("Vui lòng nhập mật khẩu");
    }

    return hasErr;
  };

  const handleSubmit = () => {
    if (val()) return;
    const payload = {
      username: email,
      password
    };
    setLoading(true);
    AuthService.fnLogin(payload)
      .then((res) => {
        const data = res?.data;
        setCookie("access_token", String(data?.access_token), {
          expires: parseExpiresIn(data?.expires_in as string)
        });
        router.push("/cms/dashboard");
        sonner({
          type: "success",
          message: "Chào mừng bạn tới Long Châu CMS !!!"
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <div className="px-6 py-8 rounded-[20px] w-[calc(100vw-48px)] md:w-[400px] bg-white backdrop-blur">
      <form className="relative w-full h-full z-20">
        <div className="mb-6">
          <h1 className="text-xl text-black-02 font-medium">Chào mừng tới Long Châu CMS</h1>
          <p className="text-sm text-black-02 font-normal">Tài khoản sử dụng mọi dịch vụ</p>
        </div>

        <div className="relative">
          <Input
            value={email}
            id="email"
            name="email"
            type="text"
            placeholder=""
            autoComplete="off"
            aria-describedby="outlined_error_help"
            className="peer pt-3 pb-0 h-[54px] text-sm text-black-02 focus-visible:ring-0 rounded-lg border-none outline-none placeholder:text-sm placeholder:text-[#828295] shadow"
            onChange={handleChangeEmail}
            onKeyDown={handleKeydown}
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-black-02 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Tài khoản
          </label>
          {emailErr && (
            <p id="outlined_error_help" className="mt-2 text-xs text-red-500">
              <span className="font-medium">{emailErr}</span>
            </p>
          )}
        </div>
        <div className="relative mt-4">
          <Input
            value={password}
            id="password"
            name="password"
            type="password"
            placeholder=""
            autoComplete="off"
            className="peer pt-3 pb-0 h-[54px] text-sm text-black-02 shadow focus-visible:ring-0 rounded-lg border-none outline-none placeholder:text-sm placeholder:text-[#828295]"
            onChange={handleChangePassword}
            onKeyDown={handleKeydown}
          />
          <label
            htmlFor="password"
            className="absolute text-sm text-black-02 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] start-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Mật khẩu
          </label>
          {passwordErr && (
            <p id="outlined_error_help" className="mt-2 text-xs text-red-500">
              <span className="font-medium">{passwordErr}</span>
            </p>
          )}
        </div>
        <div className="mt-8 w-full flex justify-center">
          <ButtonRoot
            type="button"
            variant="solid"
            loading={loading}
            onClick={handleSubmit}
            className="w-full h-[50px]"
          >
            Đăng nhập
          </ButtonRoot>
        </div>
      </form>
    </div>
  );
}
