"use server";

import { cookies } from "next/headers";

const hasCookieServer = (key: string): boolean => {
  const cookieStore = cookies();
  return cookieStore.has(key);
};

export { hasCookieServer };
