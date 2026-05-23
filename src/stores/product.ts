import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { IProduct, IProductListResponse, IProductResponse } from "@/types/cms/product";

interface IStore {
  _api: Record<
    "listProduct" | "detailProduct" | "createProduct" | "updateProduct" | "deleteProduct",
    IApiEndpoint
  >;
  _fnGetListProduct: (_?: string) => Promise<IProductListResponse | undefined>;
  _fnGetDetailProduct: (_id: number) => Promise<IProductResponse | undefined>;
  _fnGetCreateProduct: (_payload: IProduct) => Promise<IProductResponse | undefined>;
  _fnGetUpdateProduct: (_id: number | undefined, _payload: IProduct) => Promise<IProductResponse | undefined>;
  _fnGetDeleteProduct: (_id: number) => Promise<IProductResponse | undefined>;
}

export const useProductStore = create<IStore>((_, get) => ({
  _api: {
    listProduct: {
      url: "/products",
      method: "GET"
    },
    detailProduct: {
      url: "/products/{id}",
      method: "GET"
    },
    createProduct: {
      url: "/products",
      method: "POST"
    },
    updateProduct: {
      url: "/products/{id}",
      method: "PUT"
    },
    deleteProduct: {
      url: "/products/{id}",
      method: "DELETE"
    }
  },
  _fnGetListProduct: async (params) => {
    const { _api } = get();
    const endpoint = _api.listProduct.url;
    return await http.get<any, IProductListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
    // return {
    //   "pageIndex": 1,
    //   "pageSize": 20,
    //   "totalPages": 1,
    //   "totalItems": 2,
    //   "data": [
    //     {
    //       "id": 2,
    //       "name": "Tăng chiều cao",
    //       "slug": "tang-chieu-cao",
    //       "price": 100000,
    //       "brand": "Brauer",
    //       "image": ["https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_08363_4cc0bfe6e0.jpg"],
    //       "category":
    //         "Thực phẩm chức năng"
    //       ,
    //       "property": [
    //         {
    //           "name": "Thành phần",
    //           "value": "Vitamin D3, Canxi"
    //         },
    //         {
    //           "name": "Công dụng",
    //           "value": "Giúp tăng chiều cao"
    //         }
    //       ],
    //       "description": "Siro Brauer Baby & Child Immune Defence Probiotic Liquid cung cấp vi khuẩn có lợi cho hệ tiêu hóa, giúp cân bằng vi sinh đường ruột, giảm các biểu hiện rối loạn tiêu hóa như tiêu chảy, táo bón, đi ngoài phân sống,... Điều này còn hỗ trợ tăng đề kháng và nâng cao sức khỏe toàn diện của trẻ. Brauer Baby & Child Immune Defence Probiotic Liquid xuất xứ từ Úc. Sản phẩm dùng được cho trẻ từ 0 tháng tuổi trở lên.",
    //       "unit": "Hộp",
    //       "meta_name": "Thuốc tăng chiều cao",
    //       "meta_description": "Thuốc tăng chiều cao",
    //       "status": 1,
    //       "created_at": "11:13:27 12/04/2025",
    //       "updated_at": "11:13:27 12/04/2025"
    //     },
    //     {
    //       "id": 1,
    //       "name": "Thuốc ho",
    //       "slug": "tang-chieu-cao",
    //       "price": 100000,
    //       "brand": "Brauer",
    //       "image": ["https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09352_ae155b3fe6.jpg"],
    //       "category": [
    //         "Thực phẩm chức năng",
    //         "Thuốc"
    //       ],
    //       "property": [
    //         {
    //           "name": "Thành phần",
    //           "value": "Vitamin D3, Canxi"
    //         },
    //         {
    //           "name": "Công dụng",
    //           "value": "Giúp tăng chiều cao"
    //         }
    //       ],
    //       "description": "Siro Brauer Baby & Child Immune Defence Probiotic Liquid cung cấp vi khuẩn có lợi cho hệ tiêu hóa, giúp cân bằng vi sinh đường ruột, giảm các biểu hiện rối loạn tiêu hóa như tiêu chảy, táo bón, đi ngoài phân sống,... Điều này còn hỗ trợ tăng đề kháng và nâng cao sức khỏe toàn diện của trẻ. Brauer Baby & Child Immune Defence Probiotic Liquid xuất xứ từ Úc. Sản phẩm dùng được cho trẻ từ 0 tháng tuổi trở lên.",
    //       "unit": "Hộp",
    //       "meta_name": "Thuốc tăng chiều cao",
    //       "meta_description": "Thuốc tăng chiều cao",
    //       "status": 1,
    //       "created_at": "11:13:27 12/04/2025",
    //       "updated_at": "11:13:27 12/04/2025"
    //     },
    //   ],
    // }
  },
  _fnGetDetailProduct: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailProduct.url.replace("{id}", String(id));
    return await http.get<any, IProductResponse>(endpoint);
    // return {
    //   data: {
    //     "id": 1,
    //     "name": "Thuốc ho",
    //     "slug": "tang-chieu-cao",
    //     "price": 100000,
    //     "brand": "Brauer",
    //     "image": ["https://cdn.nhathuoclongchau.com.vn/unsafe/768x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09352_ae155b3fe6.jpg"],
    //     "category_id":
    //       1,
    //     "property": [
    //       {
    //         "name": "Thành phần",
    //         "value": "Vitamin D3, Canxi"
    //       },
    //       {
    //         "name": "Công dụng",
    //         "value": "Giúp tăng chiều cao"
    //       }
    //     ],
    //     "description": "Siro Brauer Baby & Child Immune Defence Probiotic Liquid cung cấp vi khuẩn có lợi cho hệ tiêu hóa, giúp cân bằng vi sinh đường ruột, giảm các biểu hiện rối loạn tiêu hóa như tiêu chảy, táo bón, đi ngoài phân sống,... Điều này còn hỗ trợ tăng đề kháng và nâng cao sức khỏe toàn diện của trẻ. Brauer Baby & Child Immune Defence Probiotic Liquid xuất xứ từ Úc. Sản phẩm dùng được cho trẻ từ 0 tháng tuổi trở lên.",
    //     "unit": "Hộp",
    //     "meta_name": "Thuốc tăng chiều cao",
    //     "meta_description": "Thuốc tăng chiều cao",
    //     "status": 1,
    //     "created_at": "11:13:27 12/04/2025",
    //     "updated_at": "11:13:27 12/04/2025"
    //   }
    // }
  },
  _fnGetCreateProduct: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createProduct.url;
    return await http.post<any, IProductResponse>(endpoint, payload);
  },
  _fnGetUpdateProduct: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateProduct.url.replace("{id}", String(id));
    return await http.put<any, IProductResponse>(endpoint, payload);
  },
  _fnGetDeleteProduct: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteProduct.url.replace("{id}", String(id));
    return await http.delete<any, IProductResponse>(endpoint);
  }
}));
