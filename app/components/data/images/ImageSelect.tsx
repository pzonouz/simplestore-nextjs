"use client";
import {
  useDeleteFileMutation,
  useGetFilesQuery,
} from "@/app/lib/redux/features/api";
import { DataTable } from "../DataTable";
import { Loading } from "../../ui/Loading";
import Image from "next/image";
import { File } from "@/app/lib/types/file";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { TableActions } from "../TableActions";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { Modal } from "../../ui/Modal";
import { DeleteAction } from "../DeleteAction";
import { Collapsible } from "../../ui/Collapsible";
import { UploadImage } from "./UploadImage";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { placeHolderImage } from "@/app/lib/utils/constants";

export const ImageSelect = ({
  open,
  setOpen,
  setSelectedImage,
}: {
  open: boolean;
  setOpen: (i: boolean) => void;
  setSelectedImage: Dispatch<SetStateAction<File | null>>;
}) => {
  const modalType = useAppSelector((state) => state.modal.type);
  const modalEntity = useAppSelector((state) => state.modal.entity);
  const { data: files } = useGetFilesQuery();
  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, File>> = [
    {
      accessorKey: "selector",
      header: () => "",
      cell: ({ row }) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={(e) => {
            e.preventDefault();
            setSelectedImage(row?.original);
            setOpen(false);
          }}
        >
          انتخاب
        </button>
      ),
    },
    {
      accessorFn: (row) => row.name,
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: () => "file",
      header: "عکس",
      cell: ({ row }) => {
        return (
          row?.original?.url && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${row?.original?.url || placeHolderImage}`}
              width={100}
              height={100}
              alt={row?.original?.name}
            />
          )
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => " عملیات",
      cell: ({ row }) => <TableActions entity="Image" id={row?.original?.id} />,
    },
  ];
  const [deleteAction, {}] = useDeleteFileMutation();
  return (
    <dialog
      open={open}
      onClose={() => setOpen(false)}
      className="modal overflow-y-auto"
    >
      <div className="relative bg-white w-3/4">
        <X
          className="absolute top-4 left-4 text-error cursor-pointer hover:bg-error hover:text-white"
          onClick={() => setOpen(false)}
        />
        <Collapsible>
          <UploadImage />
        </Collapsible>
        {files ? <DataTable columns={columns} data={files} /> : <Loading />}
        <Modal className="z-100 bg-white">
          {modalType == "DELETE" && modalEntity == "Image" && (
            <DeleteAction deleteAction={deleteAction} />
          )}
        </Modal>
      </div>
    </dialog>
  );
};
