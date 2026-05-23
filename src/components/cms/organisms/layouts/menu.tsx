"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/enums/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "./collapse-menu-button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-6 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-48px)] items-start space-y-1 px-2">
          {menuList.map(({ href, label, icon, active, submenus }, index) => (
            <li className={cn("w-full")} key={index}>
              {submenus.length === 0 ? (
                <div className="w-full" key={index}>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={active ? "secondary" : "ghost"}
                          className="w-full justify-start h-10 mb-1 bg-transparent shadow-none hover:bg-transparent"
                          asChild
                        >
                          <Link href={href}>
                            <span className={cn(isOpen === false ? "" : "mr-4")}>
                              <DynamicIcon name={icon} width="20" height="20" color="#ffffff" />
                            </span>
                            <p
                              className={cn(
                                "max-w-[200px] truncate text-white",
                                isOpen === false ? "-translate-x-96 opacity-0" : "translate-x-0 opacity-100"
                              )}
                            >
                              {label}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <div className="w-full" key={index}>
                  <CollapseMenuButton icon={icon} label={label} active={active} submenus={submenus} isOpen={isOpen} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
