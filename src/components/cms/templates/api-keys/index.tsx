"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import SelectField from "../../atoms/select-atom/select-field";
import TableData from "../../organisms/api-keys/table-data";
import DialogApiKey, { IRef as IRefDialogForm } from "../../organisms/api-keys/dialog";
import { useApiKeyStore } from "@/stores/api-key";
import { ApiKeyItemDto } from "@/types/cms/api-key";
import { IPagination } from "@/types/cms/common";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";

const TApiKeys: React.FC = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [dataList, setDataList] = useState<ApiKeyItemDto[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListApiKey } = useApiKeyStore();

  useEffect(() => {
    fnFetchData();
  }, [keyword, status, pagination.pageIndex, pagination.pageSize]);

  const fnFetchData = () => {
    const params = {
      keyword,
      status,
      pageSize: pagination.pageSize,
      pageIndex: pagination.pageIndex
    };
    const url = new URLSearchParams(params as any).toString();

    _fnGetListApiKey(url)
      .then((res) => {
        const items = res?.data.items || [];
        setDataList(items);
        setPagination((prev) => ({
          ...prev,
          totalPages: res?.data.totalPages || 1,
          totalItems: res?.data.totalItems || 0
        }));
      })
      .catch(() => {
        sonner({
          type: "error",
          message: common["error.sonner.500"]
        });
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
      title="Quản lý API Key"
      textActionAdd="Tạo mới"
      actionFilter={
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-3">
            <SelectField
              name="status"
              value={String(status)}
              options={[
                {
                  label: "Hoạt động",
                  value: "1"
                },
                {
                  label: "Tạm khóa",
                  value: "2"
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
      <DialogApiKey onSuccess={fnFetchData} ref={refDialogForm} />
    </CardTable>
  );
};

TApiKeys.displayName = "TApiKeys";
export default TApiKeys;
