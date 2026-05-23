"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Boxes } from "@/components/ui/background-boxes";

interface IProps {
  children: React.ReactNode;
}

const LayoutAuth: React.FC<IProps> = ({ children }: IProps) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen relative bg-blue-ea">
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

LayoutAuth.displayName = "LayoutAuth";
export default LayoutAuth;
