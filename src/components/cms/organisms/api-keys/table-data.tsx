import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApiKeyItemDto } from "@/types/cms/api-key";
import ButtonRoot from "../../atoms/button-atom/button-root";
import DialogDelete, { IRef as IRefDialogDelete } from "./dialog-delete";
import DialogApiKey, { IRef as IRefDialogForm } from "./dialog";
import BlockRoot from "../../atoms/block-atom/block-root";
import { IPagination } from "@/types/cms/common";
import { formatDate, formatNumber } from "@/utils/validate";

interface IProps {
  data: ApiKeyItemDto[];
  pagination: IPagination;
  onRefresh: () => void;
}

const TableData: React.FC<IProps> = ({ data, pagination, onRefresh }) => {
  const refDialogForm = useRef<IRefDialogForm | null>(null);
  const refDialogDelete = useRef<IRefDialogDelete | null>(null);

  const getItemIndex = (item: ApiKeyItemDto) => {
    return (pagination.pageIndex - 1) * pagination.pageSize + data.indexOf(item) + 1;
  };

  const getQuotaText = (quota: number) => {
    return quota === 0 ? "Không giới hạn" : formatNumber(quota);
  };

  const getRemainingText = (item: ApiKeyItemDto) => {
    return item.token_quota === 0 ? "Không giới hạn" : formatNumber(item.token_remaining);
  };

  return (
    <React.Fragment>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">#</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>API key</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Hạn dùng</TableHead>
            <TableHead>Quota</TableHead>
            <TableHead>Đã dùng</TableHead>
            <TableHead>Còn lại</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[180px]">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{getItemIndex(item)}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="max-w-[220px] truncate font-mono text-xs">{item.api_key_masked}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{formatDate(item.expires_at)}</TableCell>
              <TableCell>{getQuotaText(item.token_quota)}</TableCell>
              <TableCell>{formatNumber(item.token_used)}</TableCell>
              <TableCell>{getRemainingText(item)}</TableCell>
              <TableCell>
                <BlockRoot type={item.status === 1 ? "success" : "error"} text={item.status === 1 ? "Hoạt động" : "Tạm khóa"} />
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
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
                    color="error"
                    onClick={() => {
                      refDialogDelete.current?._setID(item.id);
                    }}
                  >
                    Xóa
                  </ButtonRoot>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="py-8 text-center text-sm text-gray-500">
                Chưa có API key
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <DialogDelete onSuccess={onRefresh} ref={refDialogDelete} />
      <DialogApiKey onSuccess={onRefresh} ref={refDialogForm} />
    </React.Fragment>
  );
};

TableData.displayName = "TableData";
export default TableData;
