type IRequestPagination<T extends Record<string, any>> = T & {
  page?: number | string;
  page_size?: number | string;
  limit?: number | string;
  sort_by?: string;
  order?: "asc" | "desc";
};

export type { IRequestPagination };
