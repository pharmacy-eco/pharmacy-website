"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "../dynamic-lucidev";

export interface IOptionValue {
  label: string;
  value: string;
}

interface IProps {
  name?: string;
  label?: string;
  note?: string;
  error?: string | null | undefined;
  options: IOptionValue[];
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .trim();

const SearchableSelectField: React.FC<IProps> = ({
  name,
  label,
  note,
  error,
  options,
  className,
  placeholder = "-- Chọn trạng thái --",
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không tìm thấy dữ liệu",
  value,
  disabled,
  onValueChange
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value);
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    const keyword = normalizeText(search);
    if (!keyword) return options;

    return options.filter((option) => {
      return normalizeText(`${option.label} ${option.value}`).includes(keyword);
    });
  }, [options, search]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (evt: MouseEvent) => {
      if (!wrapperRef.current?.contains(evt.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    setSearch("");
  }, [open]);

  const handleSelect = (nextValue: string) => {
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={name} className="text-sm text-black-02">
          {label}
        </label>
      )}
      <Button
        id={name}
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        disabled={disabled}
        className={cn(
          "bg-white w-full h-10 justify-between px-3 font-normal focus:ring-offset-0 focus:ring-0 focus:border-blue-1d",
          {
            "border-red-400 focus:border-red-400": !!error,
            "text-[#D2D2D2] text-sm font-light": !selectedOption
          }
        )}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%-1px)] z-[60] rounded-lg border bg-white p-0 text-popover-foreground shadow-md">
          <div className="flex items-center gap-2 border-b px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={search}
              placeholder={searchPlaceholder}
              className="h-8 border-0 px-0 shadow-none focus-visible:ring-0"
              onChange={(evt) => setSearch(evt.target.value)}
              onKeyDown={(evt) => {
                if (evt.key === "Escape") setOpen(false);
              }}
            />
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-left text-sm outline-none hover:bg-[#6b72801a]",
                    {
                      "bg-[#6b72801a]": option.value === value
                    }
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4 shrink-0", {
                      "opacity-100": option.value === value,
                      "opacity-0": option.value !== value
                    })}
                  />
                  <span className="truncate">{option.label}</span>
                </button>
              ))
            ) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
            )}
          </div>
        </div>
      )}
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

SearchableSelectField.displayName = "SearchableSelectField";
export default SearchableSelectField;
