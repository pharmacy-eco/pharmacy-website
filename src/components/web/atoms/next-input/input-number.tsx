"use client";
import React from "react";
import { NextInput } from ".";
import { DynamicIcon } from "../dynamic-lucidev";
import { cn } from "@/lib/utils";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputNumber: React.FC<IProps> = ({ className = "", value, onChange, ...props }) => {
  const handleIncrement = () => {
    console.log(value);
    const syntheticEvent = {
      target: { value: (value + 1).toString() }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const handleDecrement = () => {
    console.log(value);
    if (value > 1) {
      const syntheticEvent = {
        target: { value: (value - 1).toString() }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };
  return (
    <div className={cn("relative", className)}>
      <div
        className="inline-flex items-center justify-center absolute z-5 left-3 top-1/2 h-full -translate-y-1/2 cursor-pointer border-r pr-2"
        onClick={handleDecrement}
      >
        <DynamicIcon name="minus" size={20} color="#2155d9" />
      </div>
      <NextInput className="w-32 rounded-3xl text-center focus:outline-0 " {...props} value={value} />
      <div
        className="inline-flex items-center justify-center absolute z-5 right-3 top-1/2 h-full -translate-y-1/2 cursor-pointer  border-l pl-2"
        onClick={handleIncrement}
      >
        <DynamicIcon name="plus" size={20} color="#2155d9" />
      </div>
    </div>
  );
};

InputNumber.displayName = "InputNumber";
export default InputNumber;
