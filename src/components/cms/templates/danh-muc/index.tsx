"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import TableData from "../../organisms/danh-muc/table-data";
import DialogCategories, { IRef as IRefDialogForm } from "../../organisms/danh-muc/dialog";
import { useCategoryStore } from "@/stores/category";
import { ICategory } from "@/types/cms/category";
import { IPagination } from "@/types/cms/common";
import SelectField from "../../atoms/select-atom/select-field";

interface IProps {}

const TCategories: React.FC<IProps> = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [dataList, setDataList] = useState<ICategory[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListCategory } = useCategoryStore();

  useEffect(() => {
    fnFetchData();
  }, [keyword, status, pagination.pageIndex, pagination.pageSize]);

  const fnFetchData = () => {
    let params = {
      keyword: keyword,
      status: status,
      pageSize: pagination.pageSize,
      pageIndex: pagination.pageIndex
    };
    console.log(params);
    let url = new URLSearchParams(params as any).toString();
    _fnGetListCategory(url)
      .then((res) => {
        const items = res?.data.items || [];
        setDataList(items);
        setPagination((prev) => ({
          ...prev,
          totalPages: res?.data.totalPages || 1,
          totalItems: res?.data.totalItems || 0
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangePagination = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page
    }));
  };

  return (
    <CardTable
      title="Danh mục"
      textActionAdd="Tạo mới"
      actionFilter={
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <SelectField
              name="status"
              value={String(status)}
              options={[
                {
                  label: "Hoạt động",
                  value: "1"
                },
                {
                  label: "Khóa",
                  value: "0"
                }
              ]}
              onValueChange={setStatus}
            />
          </div>
        </div>
      }
      keyword={keyword}
      pagination={pagination}
      onActionAdd={() => {
        refDialogForm.current?.onOpen();
        refDialogForm.current?._onType("create");
      }}
      onChangeKeyword={setKeyword}
      onChangePagination={handleChangePagination}
    >
      <TableData data={dataList} pagination={pagination} onRefresh={fnFetchData} />
      <DialogCategories onSuccess={fnFetchData} ref={refDialogForm} />
    </CardTable>
  );
};

TCategories.displayName = "TCategories";
export default TCategories;
