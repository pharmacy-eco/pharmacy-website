import React, { useImperativeHandle, useState } from "react";
import DialogConfirm from "../../atoms/next-dialog/dialog-confirm";
import sonner from "../../atoms/sonner-atom";
import { useProductionBatchStore } from "@/stores/production-batch";

interface IProps {
  onSuccess: () => void;
}

interface IRef {
  _setID: (_id: number | null) => void;
}

const DialogDeleteProductionBatch = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [id, setID] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { _fnDeleteProductionBatch } = useProductionBatchStore();

  const handleAction = async () => {
    if (!id) return;

    setLoading(true);
    try {
      await _fnDeleteProductionBatch(id);
      onSuccess();
      sonner({ type: "success", message: "Xóa lô sản xuất thành công" });
      setID(null);
    } catch (error: any) {
      sonner({
        type: "error",
        message: error?.response?.data?.message || error?.message || "Không thể xóa lô sản xuất"
      });
    } finally {
      setLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    _setID: (value) => setID(value)
  }));

  return (
    <DialogConfirm
      open={!!id}
      loadingAction={loading}
      onToggle={(value) => {
        if (!value) setID(null);
      }}
      onAction={handleAction}
    />
  );
});

DialogDeleteProductionBatch.displayName = "DialogDeleteProductionBatch";
export type { IRef };
export default DialogDeleteProductionBatch;
