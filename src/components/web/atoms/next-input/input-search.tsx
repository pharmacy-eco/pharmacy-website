import React from "react";
import { NextInput } from ".";
import { DynamicIcon } from "../dynamic-lucidev";
import { cn } from "@/lib/utils";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch: React.FC<IProps> = ({ className = "", ...props }) => {
  return (
    <div className={cn("relative", className)}>
      <div className="inline-flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2">
        <DynamicIcon name="search" size={20} color="#2155d9" />
      </div>
      <NextInput className="w-full pl-10" {...props} />
    </div>
  );
};

InputSearch.displayName = "InputSearch";
export default InputSearch;
