"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

export const Collapsible = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-50 p-4 w-3/4">
      <button
        className="cursor-pointer bg-primary text-white"
        onClick={() => setOpen((state) => !state)}
      >
        {!open ? <PlusIcon /> : <MinusIcon />}
      </button>
      <>{open && <> {children}</>}</>
    </div>
  );
};
