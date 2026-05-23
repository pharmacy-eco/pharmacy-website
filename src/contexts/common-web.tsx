import { createContext, useContext } from "react";
import { ICommon } from "@/types/web/common";

interface ICommonWebContext {
  common: ICommon | null;
}

const CommonWebContext = createContext<ICommonWebContext | null>(null);

interface IProps {
  common: ICommon | null;
  children: React.ReactNode;
}

const CommonWebProvider: React.FC<IProps> = ({ children, common }) => {
  const commonValue: ICommonWebContext = {
    common: common || null
  };

  return <CommonWebContext.Provider value={commonValue}>{children}</CommonWebContext.Provider>;
};

const useCommonWeb = () => {
  const context = useContext(CommonWebContext);
  if (!context) {
    throw new Error("useCommonWeb must be used within an CommonWebProvider");
  }
  return context;
};

export { CommonWebProvider, useCommonWeb };
