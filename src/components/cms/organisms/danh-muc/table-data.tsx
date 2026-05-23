import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICategory } from "@/types/cms/category";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import DialogCategories, { IRef as IRefDialogForm } from "./dialog";
import BlockRoot from "../../atoms/block-atom/block-root";
import sonner from "../../atoms/sonner-atom";
import { IPagination } from "@/types/cms/common";

interface IProps {
  data: ICategory[];
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
            <TableHead>Danh mục</TableHead>
            <TableHead>Cấp cha</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[200px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.parent?.name || "-"}</TableCell>
              <TableCell className="w-auto">
                <BlockRoot type={item.status ? "success" : "error"} text={item.status ? "Hoạt động" : "Khóa"} />
              </TableCell>
              <TableCell className="flex gap-4">
                <ButtonRoot
                  size="small"
                  variant="solid"
                  onClick={() => {
                    refDialogForm.current?.onOpen();
                    refDialogForm.current?._onType("update");
                    refDialogForm.current?._setID(item.id);
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
      <DialogCategories onSuccess={onRefresh} ref={refDialogForm} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
