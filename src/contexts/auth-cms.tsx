import { IUser } from "@/types/cms/auth";
import { createContext, useContext } from "react";
import { removeCookie } from "@/lib/cookie";

interface IAuthCMSContext {
  user?: IUser | null;
  isAuthenticated?: boolean;
  logout: () => void;
}

const AuthCMSContext = createContext<IAuthCMSContext | null>(null);

interface IProps {
  userSSR: IUser | null;
  children: React.ReactNode;
}

const AuthCMSProvider: React.FC<IProps> = ({ children, userSSR }) => {
  const authValue: IAuthCMSContext = {
    user: userSSR || null,
    isAuthenticated: !!userSSR,
    logout: () => {
      removeCookie("access_token");
      window.location.href = "/cms/dang-nhap";
    }
  };

  return <AuthCMSContext.Provider value={authValue}>{children}</AuthCMSContext.Provider>;
};

const useAuthCMS = () => {
  const context = useContext(AuthCMSContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthCMSProvider, useAuthCMS };
