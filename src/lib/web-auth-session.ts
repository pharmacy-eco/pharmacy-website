"use client";

import { E_KEY_COOKIE } from "@/enums/common";
import { removeCookie } from "@/lib/cookie";

export type WebStoredUser = {
  id?: number;
  fullname?: string;
  name?: string;
  username?: string;
  phone?: string;
  email?: string;
  birthday?: string;
  address?: string;
  avatar?: string;
};

export const WEB_USER_STORAGE_KEY = "user";

export const getWebAccessToken = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(E_KEY_COOKIE.access_token);
};

export const getWebStoredUser = (): WebStoredUser | null => {
  if (typeof window === "undefined") return null;

  const storedUser = window.localStorage.getItem(WEB_USER_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as WebStoredUser;
  } catch {
    return null;
  }
};

export const getWebUserDisplayName = (user?: WebStoredUser | null) => {
  return user?.fullname || user?.name || user?.username || user?.phone || "";
};

export const hasWebAuthSession = () => Boolean(getWebAccessToken());

export const clearWebAuthSession = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(E_KEY_COOKIE.access_token);
    window.localStorage.removeItem(WEB_USER_STORAGE_KEY);
  }

  removeCookie(E_KEY_COOKIE.access_token);
};
