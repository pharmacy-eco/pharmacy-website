import React from "react";
import NextImg from "../next-img";
import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  ic?: string;
  children: React.ReactNode;
  className?: string;
}

const CardFeatured: React.FC<IProps> = ({ title, ic, children, className }) => {
  return (
    <div className={cn("w-full h-auto", className)}>
      <div className="flex gap-2 items-center pb-4">
        <div className="inline-flex items-center justify-center relative w-[28px] h-[28px]">
          <NextImg
            src={ic ? ic : "/assets/icons/danh_muc_noi_bat_d03496597a.webp"}
            alt="Long Châu"
            width={28}
            height={28}
            className="absolute w-full h-full"
          />
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <React.Fragment>{children}</React.Fragment>
    </div>
  );
};

CardFeatured.displayName = "CardFeatured";
export default CardFeatured;
