import Cookies from "js-cookie";
import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
  secure: true,
  sameSite: "Strict" as const
};

const setCookie = (key: string, value: string | object, options = {}) => {
  try {
    const finalValue = typeof value === "object" ? JSON.stringify(value) : value;
    Cookies.set(key, finalValue, { ...COOKIE_OPTIONS, ...options });
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
};

const getCookie = (key: string): string | null => {
  try {
    const value = Cookies.get(key);
    if (!value) return null;

    return value.startsWith("{") || value.startsWith("[") ? JSON.parse(value) : value;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return null;
  }
};

const hasCookie = (key: string, p0: unknown): boolean => {
  return Cookies.get(key) !== undefined;
};

const removeCookie = (key: string) => {
  try {
    Cookies.remove(key, { path: "/" });
  } catch (error) {
    console.error("Error removing cookie:", error);
  }
};

const parseExpiresIn = (expiresIn: string | number): number => {
  if (typeof expiresIn === "number") return expiresIn;
  const match = expiresIn.match(/^(\d+)([dhm])$/);
  if (!match) return 7;

  const [, numStr, unit] = match;
  const num = parseInt(numStr);
  switch (unit) {
    case "d":
      return num;
    case "h":
      return num / 24;
    case "m":
      return num / 1440;
    default:
      return 7;
  }
};

export { setCookie, getCookie, hasCookie, removeCookie, parseExpiresIn };
