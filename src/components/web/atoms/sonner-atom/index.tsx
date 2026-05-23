import React from "react";
import { toast as sonnerToast } from "sonner";
import { DynamicIcon } from "../dynamic-lucidev";
import { cn } from "@/lib/utils";

interface SonnerProps {
  id: string | number;
  title?: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  position?: "bottom-center" | "bottom-left" | "bottom-right" | "top-center" | "top-left" | "top-right";
}

function sonner(sonner: Omit<SonnerProps, "id">) {
  return sonnerToast.custom(
    (id) => <Sonner id={id} title={sonner.title} message={sonner.message} type={sonner.type} />,
    {
      position: sonner.position || "top-right"
    }
  );
}

const toastStyle = {
  success: {
    bg: "bg-emerald-100",
    text: "text-emerald-900",
    border: "border-emerald-500"
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-900",
    border: "border-red-500"
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-900",
    border: "border-yellow-500"
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-900",
    border: "border-blue-500"
  }
};

function Sonner({ id, title = "Thành công", message, type = "success" }: SonnerProps) {
  let icon = "circle-check";
  if (type === "info") {
    icon = "info";
    title = "Thông tin";
  } else if (type === "warning") {
    icon = "circle-alert";
    title = "Cảnh báo";
  } else if (type === "error") {
    icon = "ban";
    title = "Lỗi";
  }

  const style = toastStyle[type];

  return (
    <div
      className={cn(
        "flex items-center justify-between min-w-[350px] max-w-[36.4rem] w-full rounded-xl shadow-md p-4 border-l-[3px]",
        style.bg,
        style.text,
        style.border
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">
          <DynamicIcon name={icon} width="20px" height="20px" />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs font-normal">{message}</p>
        </div>
      </div>
      <div className="pl-4 cursor-pointer flex items-center justify-center" onClick={() => sonnerToast.dismiss(id)}>
        <DynamicIcon name="x" width="16px" height="16px" />
      </div>
    </div>
  );
}

export default sonner;
