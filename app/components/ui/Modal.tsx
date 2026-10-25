"use client";
import { setModalId } from "@/app/lib/redux/features/modal";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { useEffect, useRef } from "react";

export const Modal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const id = useAppSelector((state) => state.modal.id);
  const ref = useRef<HTMLDialogElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (id && !el.open) el.showModal();
    if (!id && el.open) el.close();
  }, [id]);

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={() => dispatch(setModalId(null))}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          ref.current?.close();
        }
      }}
    >
      <div className={`w-3/4 ${className}`}>{children}</div>
    </dialog>
  );
};
