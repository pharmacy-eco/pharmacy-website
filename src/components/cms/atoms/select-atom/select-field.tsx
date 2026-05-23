import React from "react";
import { SelectProps } from "@radix-ui/react-select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DynamicIcon } from "../dynamic-lucidev";
import { cn } from "@/lib/utils";

export interface IOptionValue {
  label: string;
  value: any;
}

interface IProps extends SelectProps {
  label?: string;
  note?: string;
  error?: string | null | undefined;
  options: IOptionValue[];
  className?: string;
  placeholder?: string;
}

const SelectField: React.FC<IProps> = ({
  label,
  note,
  name,
  error,
  options,
  className,
  placeholder = "-- Chọn trạng thái --",
  ...props
}) => {
  return (
    <Select {...props}>
      <div className={`${className} flex flex-col gap-1`}>
        {label && (
          <label htmlFor={name} className="text-sm text-black-02">
            {label}
          </label>
        )}
        <SelectTrigger
          className={cn(
            "bg-white w-full h-10 focus:ring-offset-0 focus:ring-0 focus:border-blue-1d data-[placeholder]:text-sm data-[placeholder]:font-light data-[placeholder]:text-[#D2D2D2]",
            {
              "border-red-400 focus:border-red-400": !!error
            }
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {note && (
          <div className="flex gap-1 items-center">
            <DynamicIcon name="info" size={16} color="#60a5fa" />
            <p className="text-[13px] text-blue-400">{note}</p>
          </div>
        )}
        {error && (
          <div className="flex gap-1 items-center">
            <DynamicIcon name="circle-alert" size={16} color="#f87171" />
            <p className="text-[13px] text-red-400">{error}</p>
          </div>
        )}
      </div>
      <SelectContent className="rounded-lg">
        <SelectGroup>
          {options.map((option, idx) => {
            return (
              <SelectItem key={idx} value={option.value} className="cursor-pointer hover:bg-[#6b72801a]">
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

SelectField.displayName = "SelectField";
export default SelectField;
