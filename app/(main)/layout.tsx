import React from "react";
import { DesktopMenu } from "../components/ui/DesktopMenu";
import { MenuItem } from "../lib/types/menu";
import Image from "next/image";
import { Searchbar } from "../components/ui/Searchbar";
import { ShoppingCartIcon, UserSquare } from "lucide-react";
import { Footer } from "../components/ui/Footer";

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
      <div className="w-full px-8">
        <div
          id="desktop-top-bar"
          className="flex gap-4 items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Image alt="logo" width={100} height={100} src="/imgs/Logo.jpg" />
            <Searchbar className="hidden sm:flex" />
          </div>
          <div className="flex flex-row gap-2">
            <div className="p-3 bg-sky-100 rounded-md text-sky-950 hover:bg-sky-950 hover:text-white cursor-pointer">
              <UserSquare size={32} />
            </div>
            <div className="p-3 bg-sky-100 rounded-md text-sky-950 hover:bg-sky-950 hover:text-white cursor-pointer">
              <ShoppingCartIcon size={32} />
            </div>
          </div>
        </div>
        <DesktopMenu menuItems={menuItems} />
      </div>
      <div className="mt-8 mx-8">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
