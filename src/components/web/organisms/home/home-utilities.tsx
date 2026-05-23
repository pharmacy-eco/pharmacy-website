import React from "react";
import NextImg from "../../atoms/next-img";

interface IProps {}

const HomeUtilities: React.FC<IProps> = () => {
  const items = [
    {
      ic: "/assets/icons/1_Can_Mua_Thuoc_48x48_a5fde193bc.webp",
      label: "Cần mua thuốc"
    },
    {
      ic: "/assets/icons/tuvanvoiduocsi_1855320b40.webp",
      label: "Tư vấn với Dược Sỹ"
    },
    {
      ic: "/assets/icons/3_Tim_Nha_Thuoc_48x48_0f6815dfaa.webp",
      label: "Tìm nhà thuốc"
    },
    {
      ic: "/assets/icons/4_Lich_Su_Don_Hang_48x48_0f0d6dd55f.webp",
      label: "Đơn của tôi"
    },
    {
      ic: "/assets/icons/5_Tiem_Vac_Xin_48x48_ca5f6b3aeb.webp",
      label: "Tiêm Vắc xin"
    },
    {
      ic: "/assets/icons/6_Kiem_Tra_Suc_Khoe_48x48_c28c2a24d5.webp",
      label: "Kiểm tra sức khỏe"
    }
  ];
  return (
    <div className="grid gap-4 grid-cols-12 pb-6">
      {items.map((x, idx) => {
        return (
          <div key={idx} className="col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-center md:justify-start w-full h-full p-3 md:p-4 rounded-lg bg-white ">
              <div className="w-10 h-10 relative">
                <NextImg
                  alt={x.label}
                  src={x.ic}
                  width={40}
                  height={40}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
              <span className="flex flex-1 w-full text-sm md:text-base font-medium justify-center md:justify-start">
                {x.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

HomeUtilities.displayName = "HomeUtilities";
export default HomeUtilities;
