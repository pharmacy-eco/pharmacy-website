import { cn } from "@/lib/utils";
import React from "react";
import { DynamicIcon } from "../dynamic-lucidev";

interface IProps {
  type: "next" | "prev";
  className?: string;
  style?: React.CSSProperties;
  isCenter?: boolean;
  onClick?: () => void;
}

const ButtonSlider: React.FC<IProps> = ({ type, isCenter = false, className = "", style, onClick }) => {
  const isDisabled = className.includes("slick-disabled");
  if (isDisabled) return null;
  return (
    <button
      id="al"
      aria-label="Name"
      style={style}
      className={cn(
        className,
        "!w-8 !h-8 md:!w-10 md:!h-10 !hidden md:!inline-flex !items-center !justify-center !bg-white rounded-full shadow-md transition-all duration-200 !border !border-transparent !z-10 hover:!border-blue-1d before:!hidden",
        {
          "!right-4": type === "next" && !isCenter,
          "!left-4": type === "prev" && !isCenter
        }
      )}
      onClick={onClick}
    >
      <DynamicIcon
        name={type === "next" ? "chevron-right" : "chevron-left"}
        className="w-5 md:w-6 h-5 md:h-6 stroke-blue-1d"
      />
    </button>
  );
};
ButtonSlider.displayName = "ButtonSlider";
export default ButtonSlider;
