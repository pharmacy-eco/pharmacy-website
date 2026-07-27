"use client";

import React, { useEffect, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import TableData from "../../organisms/danh-gia/table-data";
import SelectField from "../../atoms/select-atom/select-field";
import { useReviewStore } from "@/stores/review";
import { IPagination } from "@/types/cms/common";
import { ReviewsListDto } from "@/types/cms/review";

interface IProps {}

const TReviews: React.FC<IProps> = () => {
  const [dataList, setDataList] = useState<ReviewsListDto[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListReview } = useReviewStore();

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
    _fnGetListReview(url)
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
      title="Đánh giá"
      actionFilter={
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <SelectField
              name="status"
              value={String(status)}
              options={[
                { label: "Hoạt động", value: "1" },
                { label: "Chờ duyệt", value: "2" }
              ]}
              onValueChange={setStatus}
            />
          </div>
        </div>
      }
      keyword={keyword}
      pagination={pagination}
      onChangeKeyword={setKeyword}
      onChangePagination={handleChangePagination}
    >
      <TableData data={dataList} pagination={pagination} onRefresh={fnFetchData} />
    </CardTable>
  );
};

TReviews.displayName = "TReviews";
export default TReviews;
