"use client";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/lib/redux/features/api";
import { DataTable } from "../data/DataTable";
import { Collapsible } from "../ui/Collapsible";
import { CategoryForm } from "./CategoryForm";
import { Modal } from "../ui/Modal";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { ModalType } from "@/app/lib/types/modal";
import { DeleteAction } from "../data/DeleteAction";
import { Loading } from "../ui/Loading";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { Category } from "@/app/lib/types/generatedTypes";
import { TableActions } from "../data/TableActions";

export const CategoriesPage = () => {
  const features = tableFeatures({});

  const columns: Array<ColumnDef<typeof features, Category>> = [
    {
      accessorKey: "name",
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.parentName,
      id: "parentName",
      header: () => <span>والد</span>,
      cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
      accessorKey: "actions",
      header: () => <span>عملیات</span>,
      cell: ({ row }) => <TableActions id={row?.original?.id} />,
    },
  ];
  const { data: categories } = useGetCategoriesQuery();
  const modalType: ModalType = useAppSelector((state) => state.modal.type);
  const [deleteAction, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();
  return (
    <div>
      <Collapsible>
        <CategoryForm />
      </Collapsible>
      {categories ? (
        <DataTable columns={columns} data={categories} />
      ) : (
        <Loading />
      )}
      <Modal>
        {modalType == "EDIT" && <CategoryForm />}
        {modalType == "DELETE" && <DeleteAction deleteAction={deleteAction} />}
      </Modal>
    </div>
  );
};
