import { IOptionValue } from "../../atoms/select-atom/select-field";

type StatusType = "success" | "error" | "info" | "warning";

const ORDER_STATUS_OPTIONS: IOptionValue[] = [
  { label: "Chờ xử lý", value: "0" },
  { label: "Đã xác nhận", value: "1" },
  { label: "Đang giao", value: "2" },
  { label: "Hoàn thành", value: "3" },
  { label: "Đã hủy", value: "4" }
];

const getOrderStatusText = (status: number | string) => {
  return ORDER_STATUS_OPTIONS.find((option) => Number(option.value) === Number(status))?.label || "Không xác định";
};

const getOrderStatusType = (status: number | string): StatusType => {
  if (Number(status) === 3) return "success";
  if (Number(status) === 4) return "error";
  if (Number(status) === 1 || Number(status) === 2) return "info";
  return "warning";
};

export { ORDER_STATUS_OPTIONS, getOrderStatusText, getOrderStatusType };
