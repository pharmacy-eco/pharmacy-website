import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: string;
  submenus: Submenu[];
};

export function getMenuList(pathname: string): Menu[] {
  return [
    {
      href: "/cms/dashboard",
      label: "Dashboard",
      active: pathname.includes("/cms/dashboard"),
      icon: "gauge",
      submenus: []
    },
    {
      href: "/cms/quay-thuoc",
      label: "Quầy thuốc",
      active: pathname.includes("/cms/quay-thuoc"),
      icon: "pill",
      submenus: []
    },
    {
      href: "/cms/blogs",
      label: "Bài đăng",
      active: pathname.includes("/cms/blogs"),
      icon: "notepad-text",
      submenus: []
    },
    {
      href: "/cms/danh-muc",
      label: "Danh mục",
      active: pathname.includes("/cms/danh-muc"),
      icon: "library",
      submenus: []
    },
    {
      href: "/cms/danh-gia",
      label: "Đánh giá",
      active: pathname.includes("/cms/danh-gia"),
      icon: "star",
      submenus: []
    },
    {
      href: "/cms/nguoi-dung",
      label: "Quản lý người dùng",
      active: pathname.includes("/cms/nguoi-dung"),
      icon: "user-round-cog",
      submenus: []
    },
    {
      href: "/cms/thong-tin-chung",
      label: "Quản lý thông tin",
      active: pathname.includes("/cms/thong-tin-chung"),
      icon: "badge-info",
      submenus: []
    },
    {
      href: "/cms/cau-hinh",
      label: "Cấu hình hệ thống",
      active: pathname.includes("/cms/cau-hinh"),
      icon: "settings",
      submenus: []
    }
  ];
}
