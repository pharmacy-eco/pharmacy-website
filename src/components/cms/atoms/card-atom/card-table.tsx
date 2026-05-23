"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IPagination } from "@/types/cms/common";
import Paginator from "../pagination-atom";
import ButtonRoot from "../button-atom/button-root";
import CollapsibleRoot from "../collapsible-atom/collapsible-root";
import InputSearch from "../next-input/input-search";
import { debounce } from "lodash";

interface IProps {
  title: string;
  icon?: string;
  keyword?: string;
  textActionAdd?: string;
  textActionFile?: string;
  children?: React.ReactNode;
  pagination?: IPagination | null;
  actionFilter?: React.ReactNode;
  onActionAdd?: () => void;
  onActionFile?: () => void;
  onChangeKeyword?: (_: string) => void;
  onChangePagination: (page: number) => void;
}

const CardTable: React.FC<IProps> = ({
  title,
  keyword: keywordAtom,
  pagination,
  children,
  textActionAdd,
  textActionFile,
  actionFilter,
  onActionAdd,
  onActionFile,
  onChangeKeyword,
  onChangePagination
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState(keywordAtom);

  const _setKeyword = (newValue: any) => {
    setKeyword(newValue);
  };

  useEffect(() => {
    _setKeyword(keywordAtom);
  }, [keywordAtom]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((input) => {
        onChangeKeyword?.(input);
      }, 700),
    []
  );

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, [debouncedChangeHandler]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value as string);
      debouncedChangeHandler(event.target.value);
    },
    [debouncedChangeHandler]
  );

  return (
    <div className="px-6 py-5 bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium">{title}</h4>
        <div className="flex gap-4 items-center">
          <InputSearch
            value={keyword}
            className="min-w-[300px]"
            placeholder="Nhập để tìm kiếm"
            onChange={handleChange}
          />
          {textActionFile && (
            <ButtonRoot
              variant="outline"
              onClick={() => {
                if (onActionFile) onActionFile();
              }}
            >
              {textActionFile}
            </ButtonRoot>
          )}
          {actionFilter && (
            <ButtonRoot variant={open ? "solid" : "outline"} onClick={() => setOpen((prev) => !prev)}>
              Bộ lọc nâng cao
            </ButtonRoot>
          )}
          {textActionAdd && (
            <ButtonRoot
              variant="solid"
              onClick={() => {
                if (onActionAdd) onActionAdd();
              }}
            >
              {textActionAdd}
            </ButtonRoot>
          )}
        </div>
      </div>
      <CollapsibleRoot open={open}>
        <div className="pt-3">{actionFilter}</div>
      </CollapsibleRoot>
      <div className="py-4">{children}</div>
      <div className="flex items-center justify-end">
        <Paginator
          currentPage={pagination?.pageIndex || 1}
          totalPages={pagination?.totalPages || 1}
          showPreviousNext
          onPageChange={(page) => onChangePagination(page)}
        />
      </div>
    </div>
  );
};

export default CardTable;
