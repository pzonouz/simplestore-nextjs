"use client";

import {
  setModalEntity,
  setModalId,
  setModalType,
} from "@/app/lib/redux/features/modal";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { ModalEntity } from "@/app/lib/types/modal";

export const TableActions = ({
  id,
  entity = null,
}: {
  id: string | null;
  entity?: ModalEntity;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row gap-2 items-center ">
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(setModalId(id));
          dispatch(setModalType("EDIT"));
          dispatch(setModalEntity(entity));
        }}
      >
        ویرایش
      </button>
      <button
        onClick={() => {
          dispatch(setModalId(id));
          dispatch(setModalType("DELETE"));
          dispatch(setModalEntity(entity));
        }}
        className="btn btn-error text-white"
      >
        حذف
      </button>
    </div>
  );
};
