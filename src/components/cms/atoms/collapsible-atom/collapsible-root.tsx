import React from "react";
import { cn } from "@/lib/utils";

interface Animation {
  duration?: number;
  ease?: string;
}

interface CollapsibleProps {
  children: React.ReactNode;
  open: boolean;
  animation?: Animation;
  className?: string;
}

const defaultAnimationValues: Animation = {
  duration: 0.3,
  ease: "ease"
};

const CollapsibleRoot: React.FC<CollapsibleProps> = ({
  open,
  children,
  animation = defaultAnimationValues,
  className
}) => {
  const { duration, ease } = animation;

  return (
    <div
      className={cn(
        "grid transition-all",
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        className
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionTimingFunction: ease
      }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};

CollapsibleRoot.displayName = "CollapsibleRoot";
export default CollapsibleRoot;
