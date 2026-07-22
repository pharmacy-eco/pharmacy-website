import React from "react";
import Link from "next/link";
import NextImg from "@/components/web/atoms/next-img";
import { ICategory } from "@/types/web/category";

interface IProps {
  data: ICategory[];
}

const HeaderMenuSub: React.FC<IProps> = ({ data }) => {
  return (
    <div className="hidden opacity-0 absolute z-20 left-0 bottom-0 translate-y-full p-4 min-w-[250px] rounded-xl bg-white transition-all duration-200 group-hover:block group-hover:opacity-100">
      {data.map((x, idx) => {
        return (
          <Link
            key={idx}
            href={`/${x.slug}`}
            className="flex gap-3 items-center py-3 border-b border-[#e5e7eb] last:border-none"
          >
            <NextImg src={x.image} width={24} height={24} alt="Long Châu" />
            <span className="text-sm line-clamp-1">{x.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

HeaderMenuSub.displayName = "HeaderMenuSub";
export default HeaderMenuSub;
