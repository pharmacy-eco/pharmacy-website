import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IPagination } from "@/types/cms/common";
import { ReviewsListDto } from "@/types/cms/review";
import { formatDate } from "@/utils/validate";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import { useReviewStore } from "@/stores/review";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";

type StatusType = "success" | "error" | "info" | "warning";

interface IProps {
  data: ReviewsListDto[];
  pagination: IPagination;
  onRefresh: () => void;
}

const getStatusText = (status: number) => {
  if (Number(status) === 1) return "Hoạt động";
  if (Number(status) === 2) return "Chờ duyệt";
  return "Khóa";
};

const getStatusType = (status: number): StatusType => {
  if (Number(status) === 1) return "success";
  if (Number(status) === 2) return "warning";
  return "error";
};

const TableData: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogDelete = useRef<IRefDialogDelete | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const { _fnGetUpdateReview } = useReviewStore();

  const getItemIndex = (item: ReviewsListDto) => {
    return (pagination.pageIndex - 1) * pagination.pageSize + data.indexOf(item) + 1;
  };

  const handleUpdateStatus = (item: ReviewsListDto, status: number) => {
    setLoadingId(item.id);
    _fnGetUpdateReview(item.id, { ...item, status })
      .then(() => {
        onRefresh();
        sonner({
          type: "success",
          message: "Cập nhật đánh giá thành công"
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
            <TableHead>Khách hàng</TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead className="w-[120px]">Số sao</TableHead>
            <TableHead>Nội dung</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead className="w-[220px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.name || "-"}</TableCell>
              <TableCell>
                <p className="font-medium">{item.product_name || "-"}</p>
                <p className="text-xs text-gray-500">ID: {item.product_id || "-"}</p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>{item.star || 0}</span>
                  <DynamicIcon fill="#eab308" size={14} name="star" className="text-yellow-500" />
                </div>
              </TableCell>
              <TableCell className="max-w-[360px]">
                <p className="line-clamp-2">{item.content || "-"}</p>
              </TableCell>
              <TableCell>
                <BlockRoot type={getStatusType(item.status)} text={getStatusText(item.status)} />
              </TableCell>
              <TableCell>{item.created_at ? formatDate(item.created_at, "DD/MM/YYYY HH:mm:ss") : "-"}</TableCell>
              <TableCell>
                {Number(item.status) === 1 ? (
                  <ButtonRoot
                    size="small"
                    variant="outline"
                    color="error"
                    className="mr-2"
                    loading={loadingId === item.id}
                    onClick={() => handleUpdateStatus(item, 0)}
                  >
                    Khóa
                  </ButtonRoot>
                ) : (
                  <ButtonRoot
                    size="small"
                    variant="solid"
                    className="mr-2"
                    loading={loadingId === item.id}
                    onClick={() => handleUpdateStatus(item, 1)}
                  >
                    Duyệt
                  </ButtonRoot>
                )}
                <ButtonRoot
                  size="small"
                  variant="outline"
                  onClick={() => {
                    refDialogDelete.current?._setID(item.id);
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
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
