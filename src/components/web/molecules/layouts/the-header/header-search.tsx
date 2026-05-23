"use client";

import React from "react";
import InputField from "@/components/web/atoms/next-input/input-field";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";

interface IProps {}

const HeaderSearch: React.FC<IProps> = () => {
  return (
    <div className="w-full relative">
      <InputField
        placeholder="Nhập để tìm kiếm"
        className="text-sm md:text-base pl-4 pr-10 bg-white border-none min-h-10 md:min-h-[52px] rounded-full placeholder:text-sm md:placeholder:text-base"
      />
      <div className="flex gap-3 items-center absolute top-1/2 right-5 -translate-y-1/2">
        <DynamicIcon name="mic" className="stroke-blue-1d cursor-pointer  w-4 h-4 md:w-5 md:h-5" />
        <DynamicIcon name="scan-search" className="stroke-blue-1d cursor-pointer  w-4 h-4 md:w-5 md:h-5" />
      </div>
    </div>
  );
};

HeaderSearch.displayName = "HeaderSearch";
export default HeaderSearch;
