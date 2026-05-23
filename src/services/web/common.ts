import { http } from "@/lib/http";
import { ICategoryBlog } from "@/types/web/category";
import { ICommonResponse, IHomeResponse } from "@/types/web/common";
import { IResponseData } from "@/types/web/response";

const fnGetCommonLayout = async (): Promise<ICommonResponse | undefined> => {
  return await http.get<any, ICommonResponse>("/web/general");
};

const fnGetBlogDetail = async (slug: string): Promise<IResponseData<ICategoryBlog> | undefined> => {
  return await http.get<any, IResponseData<ICategoryBlog>>("/web/blogs/" + slug);
};

const fnGetHome = async (): Promise<IHomeResponse | undefined> => {
  return await http.get<any, IHomeResponse>("/web/home");
};

const CommonService = {
  fnGetHome,
  fnGetBlogDetail,
  fnGetCommonLayout
};

export default CommonService;
