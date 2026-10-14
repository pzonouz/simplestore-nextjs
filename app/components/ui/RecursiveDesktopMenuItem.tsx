"use client";

import Link from "next/link";
import clsx from "clsx";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { MenuItem } from "@/app/lib/types/menu";

export const RecursiveDesktopMenuItem = ({
  menuItem,
  isRoute = false,
}: {
  menuItem: MenuItem;
  isRoute?: boolean;
}) => {
  const [open, setOpen] = useState<string | null>(null);
  const hasChildren = !!menuItem.children?.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    timerRef.current = setTimeout(() => setOpen(null), 150);
  };

  useEffect(() => cancelClose, []);

  if (!hasChildren) {
    return (
      <Link
        href={menuItem.href ?? "#"}
        className={clsx(
          "block rounded-lg p-4 text-sky-950 transition-colors",
          "hover:bg-sky-950 hover:text-white",
        )}
      >
        {menuItem.title}
      </Link>
    );
  }

  const isOpen = open === menuItem.title;

  return (
    <div className="relative group/menu">
      {/* Trigger */}
      <div
        onMouseEnter={() => {
          cancelClose();
          setOpen(menuItem.title);
        }}
        onMouseLeave={scheduleClose}
        className={clsx(
          "flex cursor-pointer flex-row items-center gap-2 rounded-lg p-4",
          "text-sky-950 transition-colors",
          "hover:bg-sky-950 hover:text-white",
          isOpen && "bg-sky-950 text-white", // ← only this trigger, only when this item is open
        )}
      >
        <Link href={menuItem?.href}>{menuItem.title}</Link>
        {isRoute ? (
          <ChevronDown
            className={clsx(
              "size-4 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        ) : (
          <ChevronLeft
            className={clsx(
              "size-4 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        )}
      </div>

      {/* Submenu */}
      <div
        onMouseEnter={() => {
          cancelClose();
          setOpen(menuItem.title);
        }}
        onMouseLeave={scheduleClose}
        className={clsx(
          "absolute z-50 min-w-48 flex-col rounded-lg bg-sky-50 p-2 shadow-lg",
          isOpen ? "flex menu-open" : "hidden",
          isRoute ? "right-0 top-full" : "right-full top-0",
        )}
      >
        {menuItem.children!.map((item) => (
          <RecursiveDesktopMenuItem
            key={item.title}
            menuItem={item}
            isRoute={false}
          />
        ))}
      </div>
    </div>
  );
};
