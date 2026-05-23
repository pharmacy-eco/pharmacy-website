import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import NextImg from "../../atoms/next-img";
import { DynamicIcon } from "../../atoms/dynamic-lucidev";
import { Sheet, SheetHeader, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <DynamicIcon name="menu" size={20} />
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col bg-blue-26" side="left">
        <SheetHeader>
          <div className="relative">
            <Button className="flex justify-center items-center pb-2 pt-1" variant="link" asChild>
              <Link href="/dashboard" className="flex items-center gap-2 h-12">
                <NextImg src="/assets/logo/logo.svg" alt="Long Châu" width={180} height={56} />
              </Link>
            </Button>
          </div>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
