import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ButtonRoot from "../../atoms/button-atom/button-root";
import BlockRoot from "../../atoms/block-atom/block-root";
import SelectField from "../../atoms/select-atom/select-field";
import DialogDetail, { IRef as IRefDialogDetail } from "./dialog-detail";
import { IPagination } from "@/types/cms/common";
import { IOrdersListDto } from "@/types/cms/order";
import { useOrderStore } from "@/stores/order";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";
import { getOrderStatusText, getOrderStatusType, ORDER_STATUS_OPTIONS } from "./status";

interface IProps {
  data: IOrdersListDto[];
  pagination: IPagination;
  onRefresh: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
};

const TableData: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogDetail = useRef<IRefDialogDetail | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { _fnGetUpdateOrder } = useOrderStore();

  const getItemIndex = (item: IOrdersListDto) => {
    return (pagination.pageIndex - 1) * pagination.pageSize + data.indexOf(item) + 1;
  };

  const handleUpdateStatus = (item: IOrdersListDto, status: string) => {
    if (Number(item.status) === Number(status)) return;

    setLoadingId(item.id);
    _fnGetUpdateOrder(item.id, { status: Number(status) })
      .then(() => {
        onRefresh();
        sonner({
          type: "success",
          message: "Cập nhật đơn hàng thành công"
        });
      })
      .catch((error) => {
        console.log(error);
        sonner({
          type: "error",
          message: common["error.sonner.500"]
        });
      })
      .finally(() => {
        setLoadingId(null);
      });
  };

  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Mã đơn</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead className="w-[150px]">Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[180px]">Cập nhật trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="w-[110px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={item.id || idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.code || "-"}</TableCell>
              <TableCell>
                <p className="font-medium">{item.name || "-"}</p>
                <p className="line-clamp-2 max-w-[260px] text-xs text-gray-500">{item.address || "-"}</p>
              </TableCell>
              <TableCell>
                <p>{item.phone || "-"}</p>
                <p className="text-xs text-gray-500">{item.email || "-"}</p>
              </TableCell>
              <TableCell className="font-medium">{formatCurrency(item.total_price)}</TableCell>
              <TableCell>
                <BlockRoot type={getOrderStatusType(item.status)} text={getOrderStatusText(item.status)} />
              </TableCell>
              <TableCell>
                <SelectField
                  name={`status-${item.id}`}
                  value={String(item.status)}
                  options={ORDER_STATUS_OPTIONS}
                  onValueChange={(status) => handleUpdateStatus(item, status)}
                />
                {loadingId === item.id && <p className="mt-1 text-xs text-blue-500">Đang cập nhật...</p>}
              </TableCell>
              <TableCell>{item.created_at || "-"}</TableCell>
              <TableCell>
                <ButtonRoot
                  size="small"
                  variant="outline"
                  onClick={() => {
                    refDialogDetail.current?._setItem(item);
                  }}
                >
                  Chi tiết
                </ButtonRoot>
              </TableCell>
            </TableRow>
          ))}
          {!data.length && (
            <TableRow>
              <TableCell colSpan={9} className="py-8 text-center text-sm text-gray-500">
                Chưa có đơn hàng
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DialogDetail ref={refDialogDetail} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
