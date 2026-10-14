"use client";
import { MenuItem } from "@/app/lib/types/menu";
import { RecursiveDesktopMenuItem } from "./RecursiveDesktopMenuItem";
import { yekan } from "@/app/lib/fonts";

export const DesktopMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <div
      className={`m-4 p-4 gap-6 rounded-xl text-sky-950 bg-gray-50 w-3/4 mx-auto flex flex-row items-center ${yekan.className}`}
    >
      {menuItems?.map((item) => (
        <RecursiveDesktopMenuItem
          isRoute={true}
          key={item?.title}
          menuItem={item}
        />
      ))}
    </div>
  );
};
