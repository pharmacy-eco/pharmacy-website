"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/web/atoms/next-input/input-field";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextImg from "@/components/web/atoms/next-img";
import { formatNumber } from "@/utils/validate";
import { IProductListItem } from "@/types/web/product";

interface IProps {}

const HeaderSearch: React.FC<IProps> = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<IProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const value = keyword.trim();

    if (!value) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const debounceId = window.setTimeout(async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          q: value
        });
        const response = await fetch(`/api/search-suggestions?${params.toString()}`, {
          signal: controller.signal
        });

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const data = await response.json();
        setSuggestions(data?.items || []);
      } catch (error) {
        if (!controller.signal.aborted) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(debounceId);
    };
  }, [keyword]);

  const handleSearch = (keywordValue = keyword) => {
    const value = keywordValue.trim();
    if (!value) return;

    setIsOpen(false);
    router.push(`/tim-kiem?q=${encodeURIComponent(value)}`);
  };

  const isSuggestionVisible = isOpen && !!keyword.trim();

  return (
    <form
      className="relative w-full"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSearch();
      }}
    >
      <InputField
        value={keyword}
        placeholder="Nhập để tìm kiếm"
        className="min-h-10 rounded-full border-none bg-white pl-4 pr-12 text-sm placeholder:text-sm md:min-h-11 md:text-sm md:placeholder:text-sm"
        onChange={(evt) => {
          setKeyword(evt.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            evt.preventDefault();
            handleSearch(evt.currentTarget.value);
          }
        }}
      />
      <button
        type="submit"
        aria-label="Tìm kiếm"
        className="absolute right-4 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center text-blue-1d"
      >
        <DynamicIcon name="search" className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {isSuggestionVisible && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          {loading ? (
            <div className="px-4 py-3 text-sm text-[#657384]">Đang tìm sản phẩm...</div>
          ) : suggestions.length > 0 ? (
            <div className="max-h-[360px] overflow-y-auto py-2">
              {suggestions.map((item) => {
                const currentPrice = item.current_price ?? item.curent_price ?? 0;

                return (
                  <Link
                    key={item.id}
                    href={`/san-pham/${item.slug}`}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-blue-ea"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative inline-flex h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-blue-ea">
                      <NextImg
                        src={item.thumbnail}
                        width={56}
                        height={56}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-medium text-black-02">{item.name}</span>
                      <span className="mt-1 block text-sm font-semibold text-blue-12">
                        {formatNumber(currentPrice)}đ
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-[#657384]">Không tìm thấy sản phẩm phù hợp.</div>
          )}
        </div>
      )}
    </form>
  );
};

HeaderSearch.displayName = "HeaderSearch";
export default HeaderSearch;
