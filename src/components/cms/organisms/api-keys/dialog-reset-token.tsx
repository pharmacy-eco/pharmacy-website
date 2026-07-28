import React, { useImperativeHandle, useState } from "react";
import DialogConfirm from "../../atoms/next-dialog/dialog-confirm";
import { useApiKeyStore } from "@/stores/api-key";
import sonner from "../../atoms/sonner-atom";
import common from "@/enums/common-text";

interface IProps {
  onSuccess: () => void;
}

export interface IRef {
  _setID: (_: number | null) => void;
}

const DialogResetToken = React.forwardRef<IRef, IProps>(({ onSuccess }, ref) => {
  const [id, setID] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { _fnGetResetApiKeyToken } = useApiKeyStore();

  const handleAction = () => {
    if (!id) return;
    setLoading(true);
    _fnGetResetApiKeyToken(id)
      .then(() => {
        onSuccess();
        sonner({
          type: "success",
          message: "Reset token thành công"
        });
      })
      .catch(() => {
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
      title="Reset token"
      message="Token hiện tại sẽ không còn được sử dụng sau khi reset."
      loadingAction={loading}
      onToggle={(open) => {
        if (open) setID(id);
        else setID(null);
      }}
      onAction={handleAction}
    />
  );
});

DialogResetToken.displayName = "DialogResetToken";
export default DialogResetToken;
