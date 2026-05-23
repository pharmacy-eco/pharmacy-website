import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { DynamicIcon } from "../dynamic-lucidev";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  trim?: boolean;
  label?: string;
  note?: string;
  error?: string | null | undefined;
}

const TextareaRoot: React.FC<IProps> = ({
  trim = true,
  name,
  label,
  note,
  error,
  className,
  onChange,
  onBlur,
  onKeyDown,
  ...props
}) => {
  const handleBlur = (evt: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = evt.target.value;
    if (trim) {
      evt.target.value = typeof value === "string" ? value.trim() : value;
    }
    if (onBlur) onBlur(evt);
    if (onChange) onChange(evt);
  };
  return (
    <div className={cn("flex flex-col gap-1")}>
      {label && (
        <label htmlFor={name} className="text-sm text-black-02">
          {label}
        </label>
      )}
      <Textarea
        className={cn(
          className,
          "bg-white placeholder:text-[#D2D2D2] placeholder:text-sm placeholder:font-light focus:border-blue-1d focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ring-offset-blue disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border-red-400 focus:border-red-400": !!error
          }
        )}
        onChange={onChange}
        onBlur={handleBlur}
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
TextareaRoot.displayName = "TextareaRoot";
export default TextareaRoot;
