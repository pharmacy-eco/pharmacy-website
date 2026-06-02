import React, { useState, useImperativeHandle } from "react";
import DialogConfirm from "../../atoms/next-dialog/dialog-confirm";
import { useReviewStore } from "@/stores/review";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";

interface IProps {
  onSuccess: () => void;
}

export interface IRef {
  _setID: (_: number | null) => void;
}

const DialogDelete = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [id, setID] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { _fnGetDeleteReview } = useReviewStore();

  const handleAction = () => {
    if (!id) return;
    setLoading(true);
    _fnGetDeleteReview(id)
      .then(() => {
        onSuccess();
        sonner({
          type: "success",
          message: "Xóa đánh giá thành công"
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
        setID(null);
        setLoading(false);
      });
  };

  useImperativeHandle(ref, () => ({
    _setID: (val) => setID(val)
  }));

  return (
    <DialogConfirm
      open={!!id}
      loadingAction={loading}
      onToggle={(open) => {
        if (open) setID(id);
        else setID(null);
      }}
      onAction={handleAction}
    />
  );
});

DialogDelete.displayName = "DialogDelete";
export default DialogDelete;
