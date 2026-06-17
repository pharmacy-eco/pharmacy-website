import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import DialogProducts, { IRef as IRefDialogForm } from "./dialog";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IPagination } from "@/types/cms/common";
import { IProduct } from "@/types/cms/product";
import { formatNumber } from "@/utils/validate";

const DEFAULT_PRODUCT_IMAGE = "/assets/image/medicine.jpg";

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
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Tên thuốc</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Thương hiệu</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[200px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell>
                <div className="inline-block">
                  <img
                    width={60}
                    src={item.image?.[0] || DEFAULT_PRODUCT_IMAGE}
                    alt={item.name}
                    onError={(event) => {
                      if (event.currentTarget.src.includes(DEFAULT_PRODUCT_IMAGE)) return;
                      event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="font-medium">{formatNumber(item.price)}đ</TableCell>
              <TableCell className="font-medium">{item.brand}</TableCell>
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell className="">
                <BlockRoot type={item.status ? "success" : "error"} text={item.status ? "Hoạt động" : "Khóa"} />
              </TableCell>
              <TableCell className="">
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
      <DialogProducts onSuccess={onRefresh} ref={refDialogForm} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
