"use client";

import React, { useEffect, useRef, useState } from "react";
import CardTable from "../../atoms/card-atom/card-table";
import TableData from "../../organisms/blogs/table-data";
import DialogBlogs, { IRef as IRefDialogForm } from "../../organisms/blogs/dialog";
import SelectField from "../../atoms/select-atom/select-field";
import { useBlogStore } from "@/stores/blog";
import { IBlog } from "@/types/cms/blog";
import { IPagination } from "@/types/cms/common";

interface IProps {}

const TBlogs: React.FC<IProps> = () => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const [dataList, setDataList] = useState<IBlog[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [pagination, setPagination] = useState<IPagination>({
    pageSize: 20,
    pageIndex: 1,
    totalPages: 0,
    totalItems: 0
  });

  const { _fnGetListBlog } = useBlogStore();

  useEffect(() => {
    fnFetchData();
  }, [keyword, status, pagination.pageIndex, pagination.pageSize]);

  const fnFetchData = () => {
    let params = {
      title: keyword,
      ...(status ? { status } : {}),
      pageSize: pagination.pageSize,
      pageIndex: pagination.pageIndex
    };
    let url = new URLSearchParams(params as any).toString();
    _fnGetListBlog(url)
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
      title="Bài đăng"
      textActionAdd="Tạo mới"
      actionFilter={
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            <SelectField
              name="status"
              value={String(status)}
              options={[
                { label: "Hoạt động", value: "1" },
                { label: "Khóa", value: "2" }
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
      <DialogBlogs onSuccess={fnFetchData} ref={refDialogForm} />
    </CardTable>
  );
};

TBlogs.displayName = "TBlogs";
export default TBlogs;
