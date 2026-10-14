"use client";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/app/lib/redux/features/api";
import { ColumnDef } from "@/app/lib/types/table";
import { DataTable } from "../data/DataTable";
import { Collapsible } from "../ui/Collapsible";
import { CategoryForm } from "./CategoryForm";
import { Modal } from "../ui/Modal";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { ModalType } from "@/app/lib/types/modal";
import { DeleteAction } from "../data/DeleteAction";

export const CategoriesPage = () => {
  const columnsDef: ColumnDef[] = [
    { id: "name", name: "نام" },
    { id: "parentName", name: "والد" },
  ];
  const { data: categories } = useGetCategoriesQuery();
  const modalType: ModalType = useAppSelector((state) => state.modal.type);
  const [deleteAction, { isLoading: deleteLoading }] =
    useDeleteCategoryMutation();
  return (
    <div className="w-screen h-screen ">
      <Collapsible>
        <CategoryForm />
      </Collapsible>
      {categories ? (
        <DataTable columns={columnsDef} data={categories} />
      ) : (
        <div className="loading loading-spinner loading-xl"></div>
      )}
      <Modal>
        {modalType == "EDIT" && <CategoryForm />}
        {modalType == "DELETE" && <DeleteAction deleteAction={deleteAction} />}
      </Modal>
    </div>
  );
};
