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
            className="inline-flex items-center justify-center relative w-[142px] h-[42px] md:w-[185px] md:h-[56px]"
          >
            <NextImg
              width={185}
              height={56}
              src="/assets/logo/logo_default_web_78584a5cc6.webp"
              alt="Long Châu"
              className="absolute"
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
