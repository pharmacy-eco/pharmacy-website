import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import DialogBlogs, { IRef as IRefDialogForm } from "./dialog";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IPagination } from "@/types/cms/common";
import { IBlog } from "@/types/cms/blog";
import { formatDate } from "@/utils/validate";

interface IProps {
  data: IBlog[];
  pagination: IPagination;
  onRefresh: () => void;
}

const TableData: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const refDialogDelete = useRef<IRefDialogDelete | null>(null);

  const getItemIndex = (item: IBlog) => {
    return (pagination.pageIndex - 1) * pagination.pageSize + data.indexOf(item) + 1;
  };

  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Ngày cập nhật</TableHead>
            <TableHead className="w-[180px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.title || "-"}</TableCell>
              <TableCell>{item.slug || "-"}</TableCell>
              <TableCell>{item.category_id || "-"}</TableCell>
              <TableCell>
                <BlockRoot
                  className="flex text-center"
                  type={Number(item.status) === 1 ? "success" : Number(item.status) === 2 ? "warning" : "error"}
                  text={Number(item.status) === 1 ? "Hoạt động" : Number(item.status) === 2 ? "Chờ duyệt" : "Khóa"}
                />
              </TableCell>
              <TableCell>{item.created_at ? item.created_at : "-"}</TableCell>
              <TableCell>{item.updated_at ? item.created_at : "-"}</TableCell>
              <TableCell className="flex flex-1">
                <ButtonRoot
                  size="small"
                  variant="solid"
                  className="mr-2"
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
      <DialogBlogs onSuccess={onRefresh} ref={refDialogForm} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
