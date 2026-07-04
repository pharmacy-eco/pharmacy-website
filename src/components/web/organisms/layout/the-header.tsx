import React from "react";
import HeaderTop from "../../molecules/layouts/the-header/header-top";
import HeaderBottom from "../../molecules/layouts/the-header/header-bottom";
import HeaderMenu from "../../molecules/layouts/the-header/header-menu";

interface IProps {}

const TheHeader: React.FC<IProps> = () => {
  return (
    <header className="w-full">
      <div className="w-full bg-[url('/assets/image/header_desktop_f832104627.png')] bg-cover bg-center">
        <HeaderTop />
        <HeaderBottom />
      </div>
      <HeaderMenu />
    </header>
  );
};

TheHeader.displayName = "TheHeader";
export default TheHeader;
