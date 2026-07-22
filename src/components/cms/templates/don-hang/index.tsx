"use client";

import React, { useEffect, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import SelectField from "../../atoms/select-atom/select-field";
import TableData from "../../organisms/don-hang/table-data";
import { ORDER_STATUS_OPTIONS } from "../../organisms/don-hang/status";
import { useOrderStore } from "@/stores/order";
import { IPagination } from "@/types/cms/common";
import { IOrdersListDto } from "@/types/cms/order";

interface IProps {}

const TOrders: React.FC<IProps> = () => {
  const [dataList, setDataList] = useState<IOrdersListDto[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("all");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListOrder } = useOrderStore();

  useEffect(() => {
    fnFetchData();
  }, [keyword, status, pagination.pageIndex, pagination.pageSize]);

  const fnFetchData = () => {
    const params = {
      keyword,
      ...(status !== "all" ? { status } : {}),
      pageSize: pagination.pageSize,
      pageIndex: pagination.pageIndex
    };
    const url = new URLSearchParams(params as any).toString();

    _fnGetListOrder(url)
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

  const handleChangeKeyword = (value: string) => {
    setKeyword(value);
    setPagination((prev) => ({
      ...prev,
      pageIndex: 1
    }));
  };

  const handleChangeStatus = (value: string) => {
    setStatus(value);
    setPagination((prev) => ({
      ...prev,
      pageIndex: 1
    }));
  };

  const handleChangePagination = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page
    }));
  };

  return (
    <CardTable
      title="Đơn hàng"
      actionFilter={
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3">
            <SelectField
              name="status"
              value={status}
              options={[{ label: "Tất cả", value: "all" }, ...ORDER_STATUS_OPTIONS]}
              onValueChange={handleChangeStatus}
            />
          </div>
        </div>
      }
      keyword={keyword}
      pagination={pagination}
      onChangeKeyword={handleChangeKeyword}
      onChangePagination={handleChangePagination}
    >
      <TableData data={dataList} pagination={pagination} onRefresh={fnFetchData} />
    </CardTable>
  );
};

TOrders.displayName = "TOrders";
export default TOrders;
