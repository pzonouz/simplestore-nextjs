"use client";

import { useDeleteCategoryMutation } from "@/app/lib/redux/features/api";
import { setModalId } from "@/app/lib/redux/features/modal";
import {
  setToasterEnable,
  setToasterText,
  setToasterType,
} from "@/app/lib/redux/features/toaster";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { translateError } from "@/app/lib/utils/translate";
import {
  setToasterErrorMessage,
  setToasterSuccessMessage,
} from "@/app/lib/utils/utils";

export const DeleteAction = ({
  deleteAction,
}: {
  deleteAction: ReturnType<typeof useDeleteCategoryMutation>[0];
}) => {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.modal.id);
  return (
    <div className="w-full bg-white p-8 flex flex-col gap-8">
      <div>آیا پاک شود؟</div>
      <div className="flex flex-row items-center justify-between m-8">
        <button
          className="btn btn-primary min-w-24"
          onClick={() => {
            if (!id) {
              return;
            }
            deleteAction({ id })
              .unwrap()
              .then((res) => {
                dispatch(setModalId(null));
                setToasterSuccessMessage(dispatch);
              })
              .catch((err) => {
                setToasterErrorMessage(translateError(err), dispatch);
                dispatch(setModalId(null));
              });
          }}
        >
          بله
        </button>
        <button
          className="btn btn-error text-white min-w-24"
          onClick={() => dispatch(setModalId(null))}
        >
          خیر
        </button>
      </div>
    </div>
  );
};
