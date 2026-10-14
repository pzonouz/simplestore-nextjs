"use client";
import { setToasterEnable } from "@/app/lib/redux/features/toaster";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect } from "react";

export const Toaster = () => {
  const text = useAppSelector((state) => state.toaster.text);
  const type = useAppSelector((state) => state.toaster.type);
  const enable = useAppSelector((state) => state.toaster.enable);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!enable) return;
    const id = setTimeout(() => {
      dispatch(setToasterEnable(false));
    }, 3000);
    return () => clearTimeout(id);
  }, [enable, dispatch]);
  if (!enable) return;

  return (
    enable && (
      <div
        className={clsx(
          "fixed bottom-6 w-1/3 justify-between border border-gray-300 right-1/2 translate-x-1/2 p-2 px-6 rounded-xl flex items-center",
          {
            "bg-emerald-400 text-white": type == "Success",
            "bg-red-800 text-white": type == "Error",
          },
        )}
      >
        <div>{text}</div>
        <button
          onClick={() => dispatch(setToasterEnable(false))}
          className="cursor-pointer"
        >
          <X
            className={clsx({
              "text-red-800": type == "Success",
              "text-white": type == "Error",
            })}
          />
        </button>
      </div>
    )
  );
};
