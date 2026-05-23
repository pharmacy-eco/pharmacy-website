"use client";

import React from "react";
import TheHeader from "../../organisms/layout/the-header";
import TheFooter from "../../organisms/layout/the-footer";
import { CommonWebProvider } from "@/contexts/common-web";
import { ICommon } from "@/types/web/common";

interface IProps {
  children: React.ReactNode;
  common: ICommon | null;
}

const LayoutRoot: React.FC<IProps> = ({ children, common }) => {
  return (
    <CommonWebProvider common={common}>
      <div className="bg-blue-ea">
        <TheHeader />
        {children}
        <TheFooter />
      </div>
    </CommonWebProvider>
  );
};

LayoutRoot.displayName = "LayoutRoot";
export default LayoutRoot;
