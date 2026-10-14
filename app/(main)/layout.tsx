import React from "react";
import { DesktopMenu } from "../components/ui/DesktopMenu";
import { MenuItem } from "../lib/types/menu";

const layout = ({ children }: { children: React.ReactNode }) => {
  const menuItems: MenuItem[] = [
    { title: "خانه", href: "/" },
    {
      title: "محصولات",
      href: "/products",
      children: [
        {
          title: "شیمیایی",
          href: "/category/chemical",
          children: [
            {
              title: "آزمایشگاهی",
              href: "/category/labs",
              children: [
                { title: "محیط کشت", href: `/admin/category/cultural` },
              ],
            },
          ],
        },
        { title: "صنعتی", href: "/category/industrial" },
      ],
    },
    { title: "خدمات", href: "/services" },
  ];
  return (
    <div>
      <DesktopMenu menuItems={menuItems} />
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default layout;
