import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { E_KEY_COOKIE, E_CODE_HTTP_CLIENT } from "@/enums/common";
import { getCookie, setCookie } from "./cookie";
import AuthService from "@/services/cms/auth";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const headers: Readonly<Record<string, string | boolean>> = {
  // Accept: "application/json",
  // "Content-Type": "application/json; charset=utf-8",
  // "Access-Control-Allow-Credentials": true,
  // "Access-Control-Allow-Origin": "XMLHttpRequest"
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers
    });

    http.interceptors.request.use(
      (config) => {
        const token = getCookie(E_KEY_COOKIE.access_token);

        if (token) {
          config.headers["Accept"] = "application/json";
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }
        return Promise.reject(response);
      },
      (error) => {
        return this.handleError(error);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private async handleError(error: AxiosError) {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    switch (status) {
      case E_CODE_HTTP_CLIENT.NotFound: {
        break;
      }
      case E_CODE_HTTP_CLIENT.InternalServerError: {
        break;
      }
      case E_CODE_HTTP_CLIENT.Forbidden: {
        break;
      }
      case E_CODE_HTTP_CLIENT.Unauthorized: {
        // const refreshToken = getCookie(E_KEY_COOKIE.refresh_token);
        // if (!isRefreshing && refreshToken) {
        //   isRefreshing = true;
        //   try {
        //     const refreshResponse = await AuthService.fnRefreshToken();
        //     const newToken = String(refreshResponse?.data.access_token);
        //     setCookie(E_KEY_COOKIE.access_token, newToken, refreshResponse?.data.expired_in_refresh);
        //     this.instance!.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        //     processQueue(null, newToken);
        //     return this.instance!(originalRequest!);
        //   } catch (refreshError) {
        //     processQueue(refreshError, null);
        //     return Promise.reject(refreshError);
        //   } finally {
        //     isRefreshing = false;
        //   }
        // }
        // return new Promise((resolve, reject) => {
        //   failedQueue.push({ resolve, reject });
        // })
        //   .then((token) => {
        //     originalRequest!.headers["Authorization"] = `Bearer ${token}`;
        //     return this.instance!(originalRequest!);
        //   })
        //   .catch((refreshError) => Promise.reject(refreshError));
      }
      case E_CODE_HTTP_CLIENT.TooManyRequests: {
        break;
      }
    }
    return Promise.reject(error);
  }
}

export const http = new Http();
