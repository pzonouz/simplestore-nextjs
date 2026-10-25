"use client";
import { useState } from "react";
import { RecursiveMobileMenuItem } from "./RecursiveMobileMenuItem";
import { MenuItem } from "@/app/lib/types/menu";
import { MenuIcon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const MobileMenu = ({
  menuItems,
  user = null,
}: {
  menuItems: MenuItem[];
  user?: { Email: string; User_id: string; Is_admin: boolean } | null;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={clsx("h-14", { block: open, hidden: !open })}></div>
      {!open && (
        <button onClick={() => setOpen(true)}>
          <MenuIcon size={32} className=" m-2" />
        </button>
      )}
      {open && (
        <div>
          <ul className="fixed top-1 right-1 z-10 menu bg-base-200 rounded-box w-56 m-4">
            {user?.Email && (
              <li className="hover:text-white hover:bg-black">
                <Link href="/profile">{user.Email}</Link>
              </li>
            )}
            {menuItems?.map((item) => (
              <RecursiveMobileMenuItem key={item?.title} menuItem={item} />
            ))}
          </ul>
          <div
            id="backdrop"
            className="fixed w-screen h-screen top-0 right-0 bg-black/20 backdrop-blur-lg"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
