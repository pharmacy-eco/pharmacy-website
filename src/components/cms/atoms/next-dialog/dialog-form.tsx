"use client";

import * as React from "react";
import ButtonRoot from "../button-atom/button-root";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface IProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  className?: string;
  loadingAction?: boolean;
  textCancel?: string;
  textAction?: string;
  disabledAction?: boolean;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel?: () => void;
  onAction: () => void;
}

const DialogForm: React.FC<IProps> = ({
  open,
  title = "Tạo mới",
  children,
  className,
  loadingAction = false,
  textCancel = "Hủy",
  textAction = "Tạo mới",
  disabledAction = false,
  onToggle,
  onCancel,
  onAction
}) => {
  return (
    <Dialog open={open} onOpenChange={onToggle}>
      <DialogOverlay className="fixed inset-0 bg-black/0 backdrop-blur-sm" />
      <DialogContent className={cn("px-6 py-5 gap-4 !rounded-2xl bg-white", className)}>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-medium">{title}</h4>
          <div className="w-full">{children}</div>
        </div>
        <div className="sticky bottom-0 z-10 -mx-6 -mb-5 flex w-[calc(100%+3rem)] items-center justify-end gap-4 border-t bg-white px-6 py-4">
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
            {textCancel}
          </ButtonRoot>
          <ButtonRoot disabled={disabledAction} loading={loadingAction} variant="solid" onClick={onAction}>
            {textAction}
          </ButtonRoot>
        </div>
      </DialogContent>
    </Dialog>
  );
};
DialogForm.displayName = "DialogForm";
export default DialogForm;
