"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import TableData from "../../organisms/thong-tin-chung/table-data";
import { IRef as IRefDialogForm } from "../../organisms/thong-tin-chung/dialog";
import { useInfoStore } from "@/stores/info";
import { IPagination } from "@/types/cms/common";
import SelectField from "../../atoms/select-atom/select-field";
import { IProduct } from "@/types/cms/product";
import DialogInfo from "../../organisms/thong-tin-chung/dialog";

interface IProps {}

const TInfo: React.FC<IProps> = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [dataList, setDataList] = useState<IProduct[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 10,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListInfo } = useInfoStore();

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
    let url = new URLSearchParams(params as any).toString();
    _fnGetListInfo(url)
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
      title="Thông tin chung"
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
      <DialogInfo onSuccess={fnFetchData} ref={refDialogForm} />
    </CardTable>
  );
};

TInfo.displayName = "TInfo";
export default TInfo;
