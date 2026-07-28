"use client";

import React, { useEffect, useImperativeHandle, useState } from "react";
import DialogForm from "../../atoms/next-dialog/dialog-form";
import InputField from "../../atoms/next-input/input-field";
import SelectField from "../../atoms/select-atom/select-field";
import sonner from "../../atoms/sonner-atom";
import { useProductionBatchStore } from "@/stores/production-batch";
import { IProductionBatchPayload, ProductionBatchStatus } from "@/types/cms/production-batch";

interface IProps {
  onSuccess: () => void;
}

interface IRef {
  _onType: (_type: "create" | "update") => void;
  _setID: (_id: number | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

interface IFormErrors {
  name?: string;
  manufacturingDate?: string;
  expirationDate?: string;
  quantity?: string;
  productionPlace?: string;
  status?: string;
}

const getErrorMessage = (error: any) => {
  const responseMessage = error?.response?.data?.message;
  if (typeof responseMessage === "string") return responseMessage;
  if (responseMessage && typeof responseMessage === "object") {
    return String(Object.values(responseMessage)[0] || "Có lỗi xảy ra. Vui lòng thử lại.");
  }
  return error?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
};

const DialogProductionBatch = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"create" | "update">("create");
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState<number>();

  const [name, setName] = useState("");
  const [manufacturingDate, setManufacturingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productionPlace, setProductionPlace] = useState("");
  const [status, setStatus] = useState("1");
  const [errors, setErrors] = useState<IFormErrors>({});

  const { _fnCreateProductionBatch, _fnGetDetailProductionBatch, _fnUpdateProductionBatch } =
    useProductionBatchStore();

  const clearForm = () => {
    setName("");
    setManufacturingDate("");
    setExpirationDate("");
    setQuantity("");
    setProductionPlace("");
    setStatus("1");
    setErrors({});
  };

  useEffect(() => {
    if (!open || type !== "update" || !id) return;

    setLoading(true);
    _fnGetDetailProductionBatch(id)
      .then((response) => {
        const data = response.data;
        setName(data.name || "");
        setManufacturingDate(data.manufacturing_date || "");
        setExpirationDate(data.expiration_date || "");
        setQuantity(String(data.quantity ?? ""));
        setProductionPlace(data.production_place || "");
        setStatus(String(data.status ?? 1));
      })
      .catch((error) => {
        sonner({ type: "error", message: getErrorMessage(error) });
        setOpen(false);
      })
      .finally(() => setLoading(false));
  }, [id, open, type, _fnGetDetailProductionBatch]);

  const validate = () => {
    const nextErrors: IFormErrors = {};
    const normalizedQuantity = Number(quantity);

    if (!name.trim()) nextErrors.name = "Vui lòng nhập tên lô sản xuất";
    if (!manufacturingDate) nextErrors.manufacturingDate = "Vui lòng chọn ngày sản xuất";
    if (!expirationDate) nextErrors.expirationDate = "Vui lòng chọn ngày hết hạn";
    if (manufacturingDate && expirationDate && expirationDate < manufacturingDate) {
      nextErrors.expirationDate = "Ngày hết hạn không được nhỏ hơn ngày sản xuất";
    }
    if (quantity === "" || !Number.isFinite(normalizedQuantity) || normalizedQuantity < 0) {
      nextErrors.quantity = "Số lượng phải là số lớn hơn hoặc bằng 0";
    }
    if (!productionPlace.trim()) nextErrors.productionPlace = "Vui lòng nhập nơi sản xuất";
    if (status !== "1" && status !== "2") nextErrors.status = "Vui lòng chọn trạng thái";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAction = async () => {
    if (!validate()) return;

    const payload: IProductionBatchPayload = {
      name: name.trim(),
      manufacturing_date: manufacturingDate,
      expiration_date: expirationDate,
      quantity: Number(quantity),
      production_place: productionPlace.trim(),
      status: Number(status) as ProductionBatchStatus
    };

    setLoading(true);
    try {
      if (type === "create") {
        await _fnCreateProductionBatch(payload);
      } else if (id) {
        await _fnUpdateProductionBatch(id, payload);
      }

      onSuccess();
      sonner({
        type: "success",
        message: type === "create" ? "Tạo lô sản xuất thành công" : "Cập nhật lô sản xuất thành công"
      });
      clearForm();
      setOpen(false);
    } catch (error) {
      sonner({ type: "error", message: getErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    _onType: (value) => setType(value),
    _setID: (value) => setID(value)
  }));

  return (
    <DialogForm
      open={open}
      className="w-[760px] max-w-full"
      title={type === "create" ? "Tạo lô sản xuất" : "Cập nhật lô sản xuất"}
      textAction={type === "create" ? "Tạo mới" : "Cập nhật"}
      loadingAction={loading}
      onToggle={(value) => {
        setOpen(value);
        if (!value) {
          clearForm();
          setID(undefined);
        }
      }}
      onAction={handleAction}
    >
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <InputField
            name="production_batch_name"
            label="Tên lô sản xuất"
            value={name}
            error={errors.name}
            placeholder="Nhập tên lô sản xuất"
            onChange={(event) => {
              setName(event.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <InputField
            type="date"
            name="manufacturing_date"
            label="Ngày sản xuất"
            value={manufacturingDate}
            error={errors.manufacturingDate}
            onChange={(event) => {
              setManufacturingDate(event.target.value);
              setErrors((prev) => ({ ...prev, manufacturingDate: undefined, expirationDate: undefined }));
            }}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <InputField
            type="date"
            name="expiration_date"
            label="Ngày hết hạn"
            value={expirationDate}
            min={manufacturingDate || undefined}
            error={errors.expirationDate}
            onChange={(event) => {
              setExpirationDate(event.target.value);
              setErrors((prev) => ({ ...prev, expirationDate: undefined }));
            }}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <InputField
            type="number"
            min={0}
            step={1}
            name="quantity"
            label="Số lượng"
            value={quantity}
            error={errors.quantity}
            placeholder="Nhập số lượng"
            onChange={(event) => {
              setQuantity(event.target.value);
              setErrors((prev) => ({ ...prev, quantity: undefined }));
            }}
          />
        </div>
        <div className="col-span-12 sm:col-span-6">
          <SelectField
            name="production_batch_status"
            label="Trạng thái"
            value={status}
            error={errors.status}
            options={[
              { label: "Hoạt động", value: "1" },
              { label: "Không hoạt động", value: "2" }
            ]}
            onValueChange={(value) => {
              setStatus(value);
              setErrors((prev) => ({ ...prev, status: undefined }));
            }}
          />
        </div>
        <div className="col-span-12">
          <InputField
            name="production_place"
            label="Nơi sản xuất"
            value={productionPlace}
            error={errors.productionPlace}
            placeholder="Nhập nơi sản xuất"
            onChange={(event) => {
              setProductionPlace(event.target.value);
              setErrors((prev) => ({ ...prev, productionPlace: undefined }));
            }}
          />
        </div>
      </div>
    </DialogForm>
  );
});

DialogProductionBatch.displayName = "DialogProductionBatch";
export type { IRef };
export default DialogProductionBatch;
