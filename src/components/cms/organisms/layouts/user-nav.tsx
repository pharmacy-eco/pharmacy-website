"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthCMS } from "@/contexts/auth-cms";
import DialogConfirm from "../../atoms/next-dialog/dialog-confirm";
import sonner from "../../atoms/sonner-atom";

export function UserNav() {
  const [open, setOpen] = useState<boolean>(false);
  const { user, logout } = useAuthCMS();

  const handleLogout = () => {
    logout();
    sonner({
      type: "success",
      title: "Thành công",
      message: "Bạn đã đăng xuất thành công"
    });
  };

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="#" alt="Avatar" />
              <AvatarFallback className="bg-transparent">LC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
      </TooltipProvider>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || "-"}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email || "-"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => setOpen(true)}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>

      <DialogConfirm
        open={open}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất không"
        onToggle={setOpen}
        onAction={handleLogout}
      />
    </DropdownMenu>
  );
}
