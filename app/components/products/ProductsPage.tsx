"use client";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/app/lib/redux/features/api";
import { DataTable } from "../data/DataTable";
import { Collapsible } from "../ui/Collapsible";
import { Modal } from "../ui/Modal";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { ModalEntity, ModalType } from "@/app/lib/types/modal";
import { DeleteAction } from "../data/DeleteAction";
import { Loading } from "../ui/Loading";
import { ProductForm } from "./ProductForm";
import { Product } from "@/app/lib/types/generatedTypes";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { TableActions } from "../data/TableActions";

export const ProductsPage = () => {
  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, Product>> = [
    {
      accessorFn: (row) => row.name,
      header: "نام",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.categoryName,
      header: "دسته بندی",
      cell: (info) => <i>{info.getValue<string>()}</i>,
    },
    {
      accessorKey: "actions",
      header: () => " عملیات",
      cell: ({ row }) => <TableActions id={row?.original?.id} />,
    },
  ];
  const { data: products } = useGetProductsQuery();
  const modalType: ModalType = useAppSelector((state) => state.modal.type);
  const modalEntity: ModalEntity = useAppSelector(
    (state) => state.modal.entity,
  );
  const [deleteAction, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  return (
    <div className="w-screen h-screen ">
      <Collapsible>
        <ProductForm />
      </Collapsible>
      {products ? <DataTable columns={columns} data={products} /> : <Loading />}
      <Modal>
        {modalType == "EDIT" && <ProductForm />}
        {modalType == "DELETE" && modalEntity == "Product" && (
          <DeleteAction deleteAction={deleteAction} />
        )}
      </Modal>
    </div>
  );
};
