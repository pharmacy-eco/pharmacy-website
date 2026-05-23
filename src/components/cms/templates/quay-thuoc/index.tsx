"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import TableData from "../../organisms/quay-thuoc/table-data";
import { IRef as IRefDialogForm } from "../../organisms/quay-thuoc/dialog";
import { useProductStore } from "@/stores/product";
import { useCategoryStore } from "@/stores/category";
import { IPagination } from "@/types/cms/common";
import SelectField from "../../atoms/select-atom/select-field";
import { IProduct } from "@/types/cms/product";
import { ICategory } from "@/types/cms/category";
import DialogProducts from "../../organisms/quay-thuoc/dialog";

interface IProps {}

const TProducts: React.FC<IProps> = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [dataList, setDataList] = useState<IProduct[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [lstCategory, setListCategory] = useState<any>([]);
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 10,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListProduct } = useProductStore();
  const { _fnGetListCategory } = useCategoryStore();

  useEffect(() => {
    fnFetchData();
  }, [keyword, status, category, pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fnFetchListCategory();
  }, []);

  const fnFetchListCategory = () => {
    _fnGetListCategory("") //TODO: Update api category select
      .then((res) => {
        const items =
          res?.data.items.map((item: ICategory) => ({
            label: item.name,
            value: String(item.id)
          })) || [];
        setListCategory(items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fnFetchData = () => {
    let params = {
      keyword: keyword,
      status: status,
      category: category,
      pageSize: pagination.pageSize,
      pageIndex: pagination.pageIndex
    };
    let url = new URLSearchParams(params as any).toString();
    _fnGetListProduct(url)
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
        <div className="grid grid-cols-12 gap-4">
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
          <div className="col-span-2">
            <SelectField
              name="category"
              placeholder="-- Chọn danh mục --"
              value={String(category)}
              options={lstCategory}
              onValueChange={setCategory}
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
      <DialogProducts onSuccess={fnFetchData} ref={refDialogForm} />
    </CardTable>
  );
};

TProducts.displayName = "TProducts";
export default TProducts;
