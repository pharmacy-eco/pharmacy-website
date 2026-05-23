import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  type?: "success" | "error" | "info" | "warning";
  text: string;
  className?: string;
}

const BlockRoot: React.FC<IProps> = ({ type = "success", text, className = "" }) => {
  const classType = {
    info: "text-blue-500 bg-blue-500/10",
    error: "text-red-500 bg-red-500/10",
    warning: "text-yellow-500 bg-yellow-500/10",
    success: "text-green-500 bg-green-500/10"
  };
  return <p className={cn("px-4 py-1 rounded-full text-xs inline-flex", classType?.[type], className)}>{text}</p>;
};

export default BlockRoot;
