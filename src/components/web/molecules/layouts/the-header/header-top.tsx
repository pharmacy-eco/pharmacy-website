import React from "react";
import NextImg from "../../../atoms/next-img";
import Link from "next/link";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";

interface IProps {}

const HeaderTop: React.FC<IProps> = ({}) => {
  return (
    <div className="container">
      <div className="flex justify-between py-2">
        <div className="flex gap-3 items-center">
          <DynamicIcon name="megaphone" size="20" color="#ffffff" strokeWidth={2} />
          <h3 className="text-[13px] md:text-sm text-white font-medium">Trung tâm tiêm chủng Long Châu </h3>
          <Link href="/" className="text-[13px] md:text-sm text-white font-normal underline">
            Xem chi tiết
          </Link>
        </div>
        <div className="hidden md:flex gap-5 items-center">
          <div className="flex gap-1 items-center">
            <DynamicIcon name="smartphone" size="18" color="#ffffff" strokeWidth={2} />
            <Link href="/" className="text-sm text-white font-medium">
              Tải ứng dụng
            </Link>
          </div>
          <div className="flex gap-1 items-center">
            <DynamicIcon name="phone" size="18" color="#ffffff" strokeWidth={2} />
            <Link href="tel: 1800 6928" className="text-sm text-white font-medium">
              Tư vấn ngay: 1800 6928
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderTop.displayName = "HeaderTop";
export default HeaderTop;
