import React from "react";
import Link from "next/link";
import { DynamicIcon } from "@/components/web/atoms/dynamic-lucidev";
import HeaderMenuSub from "./header-menu-sub";
import { useCommonWeb } from "@/contexts/common-web";

interface IProps {}

const HeaderMenu: React.FC<IProps> = () => {
  const { common } = useCommonWeb();
  const listMenu = common?.categories.categories_products || [];
  return (
    <div className="bg-white">
      <div className="container">
        <div className="w-full flex flex-wrap items-center gap-x-4 gap-y-0 xl:gap-6">
          {listMenu.map((item, idx) => {
            return (
              <div key={idx} className="inline-flex gap-2 items-center justify-center py-3 group relative">
                <Link href={`/${item.slug}`} className="inline-flex items-center gap-3 w-full">
                  <span className="text-sm line-clamp-1 group-hover:text-blue-12">{item.name}</span>
                  {!!item.children.length && (
                    <DynamicIcon
                      name="chevron-down"
                      size="18"
                      className="transition-all duration-200  group-hover:rotate-180"
                    />
                  )}
                  <div className="w-full h-[2px] bg-blue-12 absolute left-0 bottom-0 opacity-0 transition-all duration-200 group-hover:opacity-100"></div>
                </Link>
                {!!item.children.length && <HeaderMenuSub data={item.children} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

HeaderMenu.displayName = "HeaderMenu";
export default HeaderMenu;
