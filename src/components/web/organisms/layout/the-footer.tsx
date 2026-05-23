import React from "react";
import Link from "next/link";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import ButtonRoot from "../../atoms/button-atom/button-root";
import { useCommonWeb } from "@/contexts/common-web";
import NextImg from "../../atoms/next-img";

interface IProps {}

const TheFooter: React.FC<IProps> = () => {
  let year = new Date().getFullYear();
  const { common } = useCommonWeb();

  const listCateBlogs = common?.categories.categories_blog || [];
  const listCateProducts = common?.categories.categories_products || [];

  return (
    <footer className="w-full h-full bg-white">
      <div className="bg-blue-21 py-4">
        <div className="container">
          <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0">
            <div className="flex gap-4 items-center">
              <DynamicIcon name="map-pin" size="28" className="stroke-white hidden md:block" />
              <span className="text-sm md:text-xl text-white font-medium">
                Xem hệ thống {year} nhà thuốc trên toàn quốc
              </span>
            </div>
            <ButtonRoot
              size="larger"
              className="bg-blue-ea text-blue-21 hover:bg-blue-ea h-10 text-sm md:h-[50px] md:text-base"
            >
              Xem danh sách nhà thuốc
            </ButtonRoot>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12 py-6 gap-y-6 xl:gap-y-0">
          <div className="col-span-12 md:col-span-3 xl:col-span-2 max-w-full xl:max-w-[176px]">
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">Về chúng tôi</h4>
              <div className="flex gap-2 flex-col">
                {listCateBlogs.map((x, idx) => {
                  return (
                    <Link key={idx} href={"/bai-dang/" + x.slug} className="text-sm text-blue-12 font-normal">
                      {x.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-2 max-w-full xl:max-w-[176px]">
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">Danh mục</h4>
              <div className="flex gap-2 flex-col">
                {listCateProducts.map((x, idx) => {
                  return (
                    <Link key={idx} href={x.slug} className="text-sm text-blue-12 font-normal">
                      {x.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-2">
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">Tìm hiểu thêm</h4>
              <div className="flex gap-2 flex-col">
                {listCateProducts.map((x, idx) => {
                  return (
                    <Link key={idx} href={x.slug} className="text-sm text-blue-12 font-normal">
                      {x.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-3 max-w-full xl:max-w-[259px]">
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">
                Tổng đài (8:00-22:00)
              </h4>
              <div className="flex gap-2 flex-col">
                <div className="flex gap-2 flex-col">
                  <p className="text-sm text-black-4a">Tư vấn mua hàng</p>
                  <div className="flex items-center">
                    <Link href="tel: 18006928" className="text-sm font-normal">
                      <span className="text-blue-12">18006928</span>
                      <span className="inline-block pl-1 text-[#657384]">(Nhánh 1)</span>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <p className="text-sm text-black-4a">Tư vấn Vắc xin</p>
                  <div className="flex items-center">
                    <Link href="tel: 18006928" className="text-sm font-normal">
                      <span className="text-blue-12">18006928</span>
                      <span className="inline-block pl-1 text-[#657384]">(Nhánh 2)</span>
                    </Link>
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <p className="text-sm text-black-4a">Góp ý, khiếu nại và tiếp nhận cảnh báo thông tin vi phạm</p>
                  <div className="flex items-center">
                    <Link href="tel: 18006928" className="text-sm font-normal">
                      <span className="text-blue-12">18006928</span>
                      <span className="inline-block pl-1 text-[#657384]">(Nhánh 3)</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-3 flex flex-col gap-6">
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">
                Kết nối với chúng tôi
              </h4>
              <div className="flex gap-2">
                <Link href="https://facebook.com" className="inline-flex items-center justify-center w-8 h-8 relative">
                  <NextImg src="/assets/icons/facebook_logo_3152b9bb16.svg" width={30} height={30} alt="Long Châu" />
                </Link>
                <Link href="https://facebook.com" className="inline-flex items-center justify-center w-8 h-8 relative">
                  <NextImg src="/assets/icons/Logo_Zalo_979d41d52b.svg" width={30} height={30} alt="Long Châu" />
                </Link>
              </div>
            </div>
            <div className="flex-grow-1 max-w-full">
              <h4 className="text-xs text-caption font-semibold mb-2 text-[#657384] uppercase">
                Tải ứng dụng Long Châu
              </h4>
              <Link href="/" className="w-[100px] h-[100px]">
                <NextImg src="/assets/icons/QR_100x100_3x_1b3ed147f3.webp" width={100} height={100} alt="Long Châu" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full py-6 border-t border-gray-100">
          <p className="text-sm text-black-4a text-center font-light">
            © 2007 - 2025 Công ty Cổ Phần Dược Phẩm FPT Long Châu Số ĐKKD 0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch
            Đầu tư TPHCM
            <br />
            GP thiết lập TTTĐTTH số 538/GP-TTĐT do Sở TTTT Hồ Chí Minh cấp ngày 27 tháng 03 năm 2025
            <br />
            • Địa chỉ: 379-381 Hai Bà Trưng, P. Võ Thị Sáu, Q.3, TP. HCM • Số điện thoại: (028)73023456Email:
            sale@nhathuoclongchau.com.vn
            <br />• Người chịu trách nhiệm nội dung: Dự Án Ngonnn 😋
          </p>
        </div>
      </div>
    </footer>
  );
};

TheFooter.displayName = "TheFooter";
export default TheFooter;
