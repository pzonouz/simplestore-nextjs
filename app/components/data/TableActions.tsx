"use client";

import { setModalId, setModalType } from "@/app/lib/redux/features/modal";
import { useAppDispatch } from "@/app/lib/redux/hooks";

export const TableActions = ({ id }: { id: string | null }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row gap-2 items-center ">
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(setModalId(id));
          dispatch(setModalType("EDIT"));
        }}
      >
        ویرایش
      </button>
      <button
        onClick={() => {
          dispatch(setModalId(id));
          dispatch(setModalType("DELETE"));
        }}
        className="btn btn-error text-white"
      >
        حذف
      </button>
    </div>
  );
};
