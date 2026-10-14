import MobileMenu from "@/app/components/ui/MobileMenu";
import { MenuItem } from "@/app/lib/types/menu";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const menuItems: MenuItem[] = [
    { title: "خانه", href: "/admin" },
    {
      title: "دسته بندی ها",
      href: "/admin/categories",
    },
    {
      title: "محصولات",
      href: "/admin/products",
    },
    { title: "خدمات", href: "admin/services" },
  ];
  return (
    <div>
      <MobileMenu menuItems={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default layout;
