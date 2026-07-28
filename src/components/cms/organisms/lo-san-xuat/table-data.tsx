import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IPagination } from "@/types/cms/common";
import { IProductionBatch } from "@/types/cms/production-batch";
import BlockRoot from "../../atoms/block-atom/block-root";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogProductionBatch, { IRef as IRefDialogForm } from "./dialog";
import DialogDeleteProductionBatch, { IRef as IRefDialogDelete } from "./dialog-delete";

interface IProps {
  data: IProductionBatch[];
  pagination: IPagination;
  onRefresh: () => void;
}

const formatDate = (value: string) => {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value || "-";
};

const TableProductionBatch: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const refDialogDelete = useRef<IRefDialogDelete | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Tên lô</TableHead>
            <TableHead>Ngày sản xuất</TableHead>
            <TableHead>Ngày hết hạn</TableHead>
            <TableHead className="text-right">Số lượng</TableHead>
            <TableHead>Nơi sản xuất</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[200px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {(pagination.pageIndex - 1) * pagination.pageSize + index + 1}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{formatDate(item.manufacturing_date)}</TableCell>
                <TableCell>{formatDate(item.expiration_date)}</TableCell>
                <TableCell className="text-right">{item.quantity.toLocaleString("vi-VN")}</TableCell>
                <TableCell>{item.production_place}</TableCell>
                <TableCell>
                  <BlockRoot
                    type={item.status === 1 ? "success" : "error"}
                    text={item.status === 1 ? "Hoạt động" : "Không hoạt động"}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ButtonRoot
                      size="small"
                      variant="solid"
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
                      onClick={() => refDialogDelete.current?._setID(item.id)}
                    >
                      Xóa
                    </ButtonRoot>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                Không có lô sản xuất
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DialogDeleteProductionBatch ref={refDialogDelete} onSuccess={onRefresh} />
      <DialogProductionBatch ref={refDialogForm} onSuccess={onRefresh} />
    </>
  );
};

TableProductionBatch.displayName = "TableProductionBatch";
export default TableProductionBatch;
