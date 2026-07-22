import { NextResponse, NextRequest } from "next/server";
import { removeCookie } from "./lib/cookie";
import { E_AUTH_ROLE, E_KEY_COOKIE } from "./enums/common";
import { isNullOrEmpty } from "./utils/validate";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { buildUrl, hasRoute } from "./lib/middleware";
import { hasCookieServer } from "./lib/action-server";

const AUTH_ROUTES = ["/dang-nhap", "/cms", "/cms/dang-nhap"];

const CMS_ROUTES_PROTECTED = [
  "/cms",
  "/cms/dashboard",
  "/cms/danh-muc",
  "/cms/quay-thuoc",
  "/cms/danh-gia",
  "/cms/don-hang",
  "/cms/thong-tin-chung",
  "/cms/bai-dang",
  "/cms/cau-hinh",
  "/cms/nguoi-dung"
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  let isAuthenticated = false;
  let roleType = E_AUTH_ROLE.Admin;
  const FRONTEND_URL = request.nextUrl.origin;
  const CURRENT_URL_PATHNAME = request.nextUrl.pathname;

  if (hasCookieServer(E_KEY_COOKIE.access_token)) {
    try {
      const accessToken = request.cookies.get(E_KEY_COOKIE.access_token)?.value;
      if (accessToken && !isNullOrEmpty(accessToken)) {
        if (accessToken) {
          const data = jwtDecode(accessToken) as any;
          const isExpired = dayjs.unix(data.exp as number).diff(dayjs()) < 10;
          if (!isExpired) {
            isAuthenticated = true;
          } else {
            request.cookies.delete(E_KEY_COOKIE.access_token);
            removeCookie(E_KEY_COOKIE.access_token);
            response.cookies.set(E_KEY_COOKIE.access_token, "", {
              maxAge: 0
            });
          }
        }
      }
    } catch (error) {
      request.cookies.delete(E_KEY_COOKIE.access_token);
      removeCookie(E_KEY_COOKIE.access_token);
      response.cookies.set(E_KEY_COOKIE.access_token, "", {
        maxAge: 0
      });
    }
  }

  if (!isAuthenticated && hasRoute(CMS_ROUTES_PROTECTED, CURRENT_URL_PATHNAME)) {
    if (CURRENT_URL_PATHNAME.startsWith("/cms")) {
      if (roleType === E_AUTH_ROLE.Admin) {
        return NextResponse.redirect(buildUrl("/cms/dang-nhap", FRONTEND_URL));
      }
    }
  }

  if (isAuthenticated && hasRoute(AUTH_ROUTES, CURRENT_URL_PATHNAME)) {
    if (CURRENT_URL_PATHNAME.startsWith("/cms")) {
      if (roleType === E_AUTH_ROLE.Admin) {
        return NextResponse.redirect(buildUrl("/cms/dashboard", FRONTEND_URL));
      }
    }
  }

  return response;
}
