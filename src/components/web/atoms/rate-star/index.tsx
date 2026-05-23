"use client";

import React from "react";
import { DynamicIcon } from "@/components/cms/atoms/dynamic-lucidev";
import * as Progress from "@radix-ui/react-progress";
import { Label } from "@/components/ui/label";
interface IProps {
  rate: number;
  ratio: number;
  quantity: number;
}

const RateStar = ({ rate, ratio, quantity }: IProps) => {
  return (
    <div className="flex items-center gap-1 mt-2">
      {Array(rate)
        .fill(0)
        .map((_, index) => (
          <DynamicIcon fill="#eab308" size={14} name="star" className="text-yellow-500" />
        ))}
      {Array(5 - rate)
        .fill(0)
        .map((_, index) => (
          <DynamicIcon fill="#657384" size={14} name="star" className="text-[#657384]" />
        ))}
      <div className="w-[200px] mx-4 hidden md:block">
        <Progress.Root className="relative overflow-hidden bg-gray-200 rounded-full w-full h-2" value={ratio}>
          <Progress.Indicator
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${ratio}%` }}
          />
        </Progress.Root>
      </div>
      <Label>{quantity}</Label>
    </div>
  );
};

RateStar.displayName = "RateStar";
export default RateStar;
