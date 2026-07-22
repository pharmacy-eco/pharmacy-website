import React, { useImperativeHandle, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IOrdersListDto } from "@/types/cms/order";
import { getOrderStatusText, getOrderStatusType } from "./status";

interface IProps {}

export interface IRef {
  _setItem: (_: IOrdersListDto | null) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
};

const DialogDetail = React.forwardRef<IRef, IProps>((_, ref) => {
  const [item, setItem] = useState<IOrdersListDto | null>(null);

  useImperativeHandle(ref, () => ({
    _setItem: (val) => setItem(val)
  }));

  return (
    <Dialog open={!!item} onOpenChange={(open) => !open && setItem(null)}>
      <DialogOverlay className="fixed inset-0 bg-black/0 backdrop-blur-sm" />
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-2xl bg-white px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
            <div>
              <h4 className="text-lg font-medium">Chi tiết đơn hàng {item?.code ? `#${item.code}` : ""}</h4>
              <p className="mt-1 text-sm text-gray-500">Ngày tạo: {item?.created_at || "-"}</p>
            </div>
            {item && <BlockRoot type={getOrderStatusType(item.status)} text={getOrderStatusText(item.status)} />}
          </div>

          <div className="grid grid-cols-1 gap-3 rounded-lg border border-gray-100 p-4 text-sm md:grid-cols-2">
            <div>
              <p className="text-gray-500">Khách hàng</p>
              <p className="font-medium">{item?.name || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Số điện thoại</p>
              <p className="font-medium">{item?.phone || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{item?.email || "-"}</p>
            </div>
            <div>
              <p className="text-gray-500">Địa chỉ</p>
              <p className="font-medium">{item?.address || "-"}</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">#</TableHead>
                <TableHead>Sản phẩm</TableHead>
                <TableHead className="w-[120px]">Số lượng</TableHead>
                <TableHead className="w-[150px]">Đơn giá</TableHead>
                <TableHead className="w-[160px]">Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(item?.orderDetail || []).map((detail, index) => (
                <TableRow key={detail.id || index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <p className="font-medium">{detail.product_name || "-"}</p>
                    <p className="text-xs text-gray-500">ID: {detail.product_id || "-"}</p>
                  </TableCell>
                  <TableCell>{detail.quantity || 0}</TableCell>
                  <TableCell>{formatCurrency(detail.price)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(detail.total_price)}</TableCell>
                </TableRow>
              ))}
              {!item?.orderDetail?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-gray-500">
                    Chưa có sản phẩm trong đơn hàng
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end border-t pt-4">
            <p className="text-base font-semibold">Tổng tiền: {formatCurrency(item?.total_price || 0)}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

DialogDetail.displayName = "DialogDetail";
export default DialogDetail;
