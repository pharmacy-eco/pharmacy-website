"use client";

import React from "react";
import { useStore } from "zustand";
import { Sidebar } from "../../organisms/layouts/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/cms/auth";
import { AuthCMSProvider } from "@/contexts/auth-cms";

interface IProps {
  userSSR: IUser | null;
  children: React.ReactNode;
}

const LayoutRoot: React.FC<IProps> = ({ children, userSSR }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  if (!sidebar) return null;
  return (
    <AuthCMSProvider userSSR={userSSR}>
      <React.Fragment>
        <Sidebar />
        <main
          className={cn(
            "min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
            sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
          )}
        >
          {children}
        </main>
      </React.Fragment>
    </AuthCMSProvider>
  );
};

LayoutRoot.displayName = "LayoutRoot";
export default LayoutRoot;
