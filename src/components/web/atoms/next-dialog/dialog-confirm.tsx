"use client";

import * as React from "react";
import ButtonRoot from "../button-atom/button-root";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IProps {
  open: boolean;
  title?: String;
  message?: String;
  className?: String;
  loadingAction?: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
  onAction: () => void;
}

const DialogConfirm: React.FC<IProps> = ({
  open,
  title = "Xác nhận",
  message = "Hành động này có thể ảnh hưởng đến dữ liệu của bạn !!!",
  className,
  loadingAction,
  onToggle,
  onCancel,
  onAction
}) => {
  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogOverlay className="fixed inset-0 bg-black/0 backdrop-blur-sm" />
      <DialogContent className={cn("px-6 py-5 gap-5 !rounded-2xl bg-white", className)}>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-medium">{title}</h4>
          <p className="text-sm">{message}</p>
        </div>
        <div className="w-full flex gap-4 items-center justify-end">
          <ButtonRoot
            variant="outline"
            onClick={() => {
              if (onCancel) {
                onCancel();
                return;
              }
              onToggle(false);
            }}
          >
            Hủy
          </ButtonRoot>
          <ButtonRoot loading={loadingAction} variant="solid" onClick={onAction}>
            Xác nhận
          </ButtonRoot>
        </div>
      </DialogContent>
    </Dialog>
  );
};
DialogConfirm.displayName = "DialogConfirm";
export default DialogConfirm;
