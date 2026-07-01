import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import DialogInfo, { IRef as IRefDialogForm } from "./dialog";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IPagination } from "@/types/cms/common";
import { IProduct } from "@/types/cms/product";
import { formatNumber } from "@/utils/validate";

interface IProps {
  data: IProduct[];
  pagination: IPagination;
  onRefresh: () => void;
}

const TableData: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const refDialogDelete = useRef<IRefDialogDelete | null>(null);

  const getItemIndex = (item: any) => {
    return (pagination.pageIndex - 1) * pagination.pageSize + data.indexOf(item) + 1;
  };

  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[200px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="">
                <BlockRoot type={item.status ? "success" : "error"} text={item.status ? "Hoạt động" : "Khóa"} />
              </TableCell>
              <TableCell className="">
                <ButtonRoot
                  size="small"
                  variant="solid"
                  className="mr-2"
                  onClick={() => {
                    refDialogForm.current?._onType("update");
                    refDialogForm.current?._setID(item.id);
                    refDialogForm.current?.onOpen();
                  }}
                >
                  Cập nhật
                </ButtonRoot>
                <ButtonRoot
                  size="small"
                  variant="outline"
                  onClick={() => {
                    refDialogDelete.current?._setID(item.id as any);
                  }}
                >
                  Xóa
                </ButtonRoot>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DialogDelete onSuccess={onRefresh} ref={refDialogDelete} />
      <DialogInfo onSuccess={onRefresh} ref={refDialogForm} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
