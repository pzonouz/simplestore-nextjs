"use client";
import {
  useDeleteFileMutation,
  useGetFilesQuery,
} from "@/app/lib/redux/features/api";
import { UploadFile } from "./UploadFile";
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

export const FilesPage = () => {
  const modalType = useAppSelector((state) => state.modal.type);
  const { data: files } = useGetFilesQuery();
  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, File>> = [
    {
      accessorFn: (row) => row.name,
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: () => "file",
      header: "عکس",
      cell: ({ row }) => (
        <Image
          src={row?.original?.file || ""}
          width={100}
          height={100}
          alt={row?.original?.name}
        />
      ),
    },
    {
      accessorKey: "actions",
      header: () => " عملیات",
      cell: ({ row }) => <TableActions id={row?.original?.id} />,
    },
  ];
  const [deleteAction, {}] = useDeleteFileMutation();
  return (
    <div>
      <Collapsible>
        <UploadFile />
      </Collapsible>
      {files ? <DataTable columns={columns} data={files} /> : <Loading />}
      <Modal>
        {modalType == "DELETE" && <DeleteAction deleteAction={deleteAction} />}
      </Modal>
    </div>
  );
};
