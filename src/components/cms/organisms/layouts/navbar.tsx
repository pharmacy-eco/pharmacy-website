import { UserNav } from "./user-nav";
import { SheetMenu } from "./sheet-menu";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-white shadow-sm">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
