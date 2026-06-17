import Link from "next/link";
import React from "react";
import NextImg from "../../../atoms/next-img";
import HeaderSearch from "./header-search";
import HeaderAuth from "./header-auth";

interface IProps {}

const HeaderBottom: React.FC<IProps> = () => {
  return (
    <div className="container">
      <div className="flex flex-col gap-4 pt-2 pb-4">
        <div className="flex gap-24 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center justify-center relative w-[98px] h-[42px] md:w-[131px] md:h-[56px]"
          >
            <NextImg
              width={131}
              height={56}
              src="/assets/logo/logo-wide.png"
              alt="Medicare"
              className="w-full h-full object-contain"
            />
          </Link>
          <div className="w-full flex-1 hidden md:block">
            <HeaderSearch />
          </div>
          <HeaderAuth />
        </div>
        <div className="w-full block md:hidden">
          <HeaderSearch />
        </div>
      </div>
    </div>
  );
};

HeaderBottom.displayName = "HeaderBottom";
export default HeaderBottom;
