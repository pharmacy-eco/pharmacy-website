import React from "react";
import Link from "next/link";
import NextImg from "../../atoms/next-img";
import SliderRoot from "../../atoms/slider-atom/slider-root";
import { IBlog } from "@/types/web/common";

interface IProps {}

const HomeProgram: React.FC<IProps> = () => {
  const items = [
    {
      id: 1,
      label: "Bài kiểm tra sàng lọc nguy cơ tiền đái tháo đường",
      icon: "/assets/icons/ic_tien_dai_thao_duong_688b8d7cde.webp"
    },
    {
      id: 2,
      label: "Bài kiểm tra khả năng suy giáp",
      icon: "/assets/icons/ic_suy_giap_e30330b206.webp"
    },
    {
      id: 3,
      label: "Đánh giá mức độ kiểm soát bệnh hen",
      icon: "/assets/icons/ic_kiem_soat_hen_8b36b79a39.webp"
    },
    {
      id: 4,
      label: "Bài kiểm tra nguy cơ mắc bệnh tim mạch",
      icon: "/assets/icons/tim_mach_43be20993d.webp"
    },
    {
      id: 5,
      label: "Bài kiểm tra nguy cơ mắc bệnh Alzheimer",
      icon: "/assets/icons/sa_sut_tri_tue_73b6b51a85.webp"
    },
    {
      id: 6,
      label: "Bài kiểm tra nguy cơ mắc bệnh trào ngược dạ dày",
      icon: "/assets/icons/da_day_24ef495d10.webp"
    }
  ];

  return (
    <div className="py-6">
      <div className="px-6 lg:px-6 py-6 lg:py-8 rounded-xl overflow-hidden bg-[url('/assets/icons/Kiem_tra_suc_khoe_27634e751f.webp')] bg-center bg-no-repeat relative">
        <div className="flex gap-2 flex-col">
          <h2 className="text-xl md:text-3xl text-white font-semibold">Kiểm tra sức khỏe</h2>
          <p className="text-sm lg:text-base text-[#f6f7f9] font-normal">
            Kết quả đánh giá sẽ cho bạn lời khuyên xử trí phù hợp!
          </p>
        </div>
        <div className="w-full max-w-full md:max-w-[75%] h-auto pt-6">
          <SliderRoot
            dots={false}
            gap="md"
            infinite={false}
            slidesToShow={3}
            isBtnCenter
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1.5
                }
              }
            ]}
          >
            {items.map((x, idx) => {
              return (
                <Link href="/" key={idx} className="w-full h-full group">
                  <div className="w-full h-full min-h-[100px] p-4 flex gap-4 items-start rounded-xl bg-white">
                    <div className="inline-flex w-[56px] lg:w-16 h-[56px] lg:h-16 relative">
                      <NextImg width={64} height={64} alt="Long Châu" src={x.icon} className="absolute w-full h-full" />
                    </div>
                    <div className="w-full flex flex-1 flex-col">
                      <h4 className="text-sm text-black-02 font-semibold line-clamp-2">{x.label}</h4>
                      <p className="block text-sm text-blue-12 font-medium mt-2 cursor-pointer">Bắt đầu</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </SliderRoot>
        </div>
        <div className="hidden md:block absolute right-0 bottom-0 w-[300px] h-[200px]">
          <NextImg
            width={300}
            height={200}
            alt="Long Châu"
            src="/assets/icons/KTSK_icon_bs_Web_de1db59573.webp"
            className="absolute w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
HomeProgram.displayName = "HomeProgram";
export default HomeProgram;
