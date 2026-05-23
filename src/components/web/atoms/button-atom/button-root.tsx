import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ILoadingSpinner {
  type: "solid" | "outline";
}

// Spinner component
const LoadingSpinner: React.FC<ILoadingSpinner> = ({ type = "solid" }) => (
  <motion.div
    className={cn("w-4 h-4 border-2 rounded-full animate-spin", {
      "border-white border-t-transparent": type === "solid",
      "border-blue-400 border-t-transparent": type === "outline"
    })}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
);

export interface IButtonRootProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  color?: "primary" | "success" | "error";
  size?: "small" | "medium" | "larger";
  variant?: "solid" | "outline";
}

const ButtonRoot: React.FC<IButtonRootProps> = ({
  loading = false,
  color = "primary",
  size = "medium",
  variant = "solid",
  children,
  className,
  disabled,
  ...props
}) => {
  const classSize = {
    small: "h-9 px-4 py-2 text-xs",
    medium: "h-10 px-6 py-2 text-sm",
    larger: "h-12 px-6 py-3 text-base"
  } as const;

  const classColor = {
    primary: cn({
      "bg-blue-12 text-white hover:bg-blue-12": variant === "solid",
      "bg-white text-blue-12 border border-blue-12 hover:bg-transparent": variant === "outline"
    }),
    success: cn({
      "bg-green-500 text-white hover:bg-green-600": variant === "solid",
      "bg-white text-green-500 border border-green-500 hover:bg-transparent": variant === "outline"
    }),
    error: cn({
      "bg-red-500 text-white hover:bg-red-600": variant === "solid",
      "bg-white text-red-500 border border-red-500 hover:bg-transparent": variant === "outline"
    })
  } as const;

  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300",
        classSize[size],
        classColor[color],
        className
      )}
      {...props}
    >
      <AnimatePresence>{loading && <LoadingSpinner type={variant} key="spinner" />}</AnimatePresence>
      <div className={cn("inline-flex items-center", { "opacity-90": loading, "transition-opacity": true })}>
        {children}
      </div>
    </Button>
  );
};

ButtonRoot.displayName = "ButtonRoot";
export default ButtonRoot;
