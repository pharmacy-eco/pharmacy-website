"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import SelectField from "../../atoms/select-atom/select-field";
import DialogProductionBatch, { IRef as IRefDialogForm } from "../../organisms/lo-san-xuat/dialog";
import TableProductionBatch from "../../organisms/lo-san-xuat/table-data";
import sonner from "../../atoms/sonner-atom";
import { useProductionBatchStore } from "@/stores/production-batch";
import { IPagination } from "@/types/cms/common";
import { IProductionBatch } from "@/types/cms/production-batch";

const TProductionBatch = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [data, setData] = useState<IProductionBatch[]>([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListProductionBatch } = useProductionBatchStore();

  const fetchData = () => {
    const params = new URLSearchParams({
      name: keyword,
      pageIndex: String(pagination.pageIndex),
      pageSize: String(pagination.pageSize),
      "sort[field]": "id",
      "sort[order]": "desc"
    });
    if (status) params.set("status", status);

    _fnGetListProductionBatch(params.toString())
      .then((response) => {
        setData(response.data.items || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: response.data.totalPages || 0,
          totalItems: response.data.totalItems || 0
        }));
      })
      .catch((error) => {
        setData([]);
        sonner({
          type: "error",
          message: error?.response?.data?.message || error?.message || "Không thể tải danh sách lô sản xuất"
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [keyword, status, pagination.pageIndex, pagination.pageSize]);

  const resetToFirstPage = () => {
    setPagination((prev) => ({ ...prev, pageIndex: 1 }));
  };

  return (
    <CardTable
      title="Lô sản xuất"
      textActionAdd="Tạo mới"
      actionFilter={
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <SelectField
              name="production_batch_filter_status"
              value={status}
              placeholder="-- Tất cả trạng thái --"
              options={[
                { label: "Hoạt động", value: "1" },
                { label: "Không hoạt động", value: "2" }
              ]}
              onValueChange={(value) => {
                setStatus(value);
                resetToFirstPage();
              }}
            />
          </div>
        </div>
      }
      keyword={keyword}
      pagination={pagination}
      onActionAdd={() => {
        refDialogForm.current?._onType("create");
        refDialogForm.current?._setID(undefined);
        refDialogForm.current?.onOpen();
      }}
      onChangeKeyword={(value) => {
        setKeyword(value);
        resetToFirstPage();
      }}
      onChangePagination={(pageIndex) => setPagination((prev) => ({ ...prev, pageIndex }))}
    >
      <TableProductionBatch data={data} pagination={pagination} onRefresh={fetchData} />
      <DialogProductionBatch ref={refDialogForm} onSuccess={fetchData} />
    </CardTable>
  );
};

TProductionBatch.displayName = "TProductionBatch";
export default TProductionBatch;
