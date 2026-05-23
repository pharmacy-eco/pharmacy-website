import React from "react";
import { NextInput } from ".";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "../dynamic-lucidev";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  trim?: boolean;
  label?: string;
  note?: string;
  error?: string | null | undefined;
  onEnter?: () => void;
}

const InputField: React.FC<IProps> = ({
  trim = true,
  name,
  label,
  note,
  error,
  onChange,
  onBlur,
  onEnter,
  onKeyDown,
  ...props
}) => {
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (trim) {
      evt.target.value = typeof value === "string" ? value.trim() : value;
    }
    if (onBlur) onBlur(evt);
    if (onChange) onChange(evt);
  };
  const handleKeydown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter" || evt.keyCode === 13) {
      if (onEnter) onEnter();
    }
    if (onKeyDown) onKeyDown(evt);
  };
  return (
    <div className={cn("flex flex-col gap-1")}>
      {label && (
        <label htmlFor={name} className="text-sm text-black-02">
          {label}
        </label>
      )}
      <NextInput
        name={name}
        className={cn("w-full", {
          "border-red-400 focus:border-red-400": !!error
        })}
        autoFocus={false}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={handleKeydown}
        {...props}
      />
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
  );
};

InputField.displayName = "InputField";
export default InputField;
