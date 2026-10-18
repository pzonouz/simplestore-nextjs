import {
  useCreateProductMutation,
  useGetNoChildrenCategoriesQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/app/lib/redux/features/api";
import { setModalId } from "@/app/lib/redux/features/modal";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { ProductSchema } from "@/app/lib/schemas/product";
import { translateError } from "@/app/lib/utils/translate";
import { setToasterSuccessMessage, Slugify } from "@/app/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ImageSelect } from "../data/images/ImageSelect";
import { File } from "@/app/lib/types/file";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/app/lib/types/generatedTypes";
import { TipTap } from "../ui/Tiptop";
export const ProductForm = () => {
  const id = useAppSelector((state) => state.modal.id);
  const modalType = useAppSelector((state) => state?.modal.type);

  const { data: products } = useGetProductsQuery();
  const [createProduct, { isLoading: CreateProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: UpdateProductLoading }] =
    useUpdateProductMutation();
  const { data: categories } = useGetNoChildrenCategoriesQuery();

  const values = useMemo(() => {
    return modalType == "EDIT"
      ? products?.find((c) => c.id == id)
      : { name: "", category: "", description: "", file: "", id: "", slug: "" };
  }, [modalType, id, products]);

  const dispatch = useAppDispatch();
  const [imageOpen, setImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [backendErrors, setBackendErrors] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(ProductSchema),
    values: values,
  });
  useEffect(() => {
    if (selectedImage?.file) {
      setValue("imageUrl", selectedImage?.file);
    }
  }, [selectedImage]);
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  const name = watch("name");
  useEffect(() => {
    setValue("slug", Slugify(name ?? ""));
  }, [name]);

  const submitHandler = (data: Product) => {
    const action =
      modalType == "EDIT" && id ? updateProduct(data) : createProduct(data);

    action
      .unwrap()
      .then(() => {
        setBackendErrors([]);
        reset();
        dispatch(setModalId(null));
        setToasterSuccessMessage(dispatch);
      })
      .catch((err) => {
        setBackendErrors([]);
        const translated = translateError(err);
        if (translated) setBackendErrors(translated);
      });
  };
  return (
    <>
      <ImageSelect
        setSelectedImage={setSelectedImage}
        setOpen={setImageOpen}
        open={imageOpen}
      />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="fieldset grid grid-cols-2 gap-2 bg-base-200 border-base-300 rounded-box w-full border p-4"
      >
        <input {...register("id")} type="text" className="hidden" />
        <input
          type="text"
          {...register("name")}
          className={clsx("input w-full", {
            "border-error placeholder:text-error": errors?.name,
          })}
          placeholder="نام"
        />
        <input
          type="text"
          {...register("slug")}
          className={clsx("input w-full", {
            "border-error placeholder:text-error": errors?.slug,
          })}
          placeholder="مسیر"
        />
        {errors?.slug && (
          <div className="text-error text-xs -mt-1">
            {errors?.name?.message}
          </div>
        )}
        {errors?.name && (
          <div className="text-error text-xs -mt-1">
            {errors?.name?.message}
          </div>
        )}
        {!selectedImage && (
          <div
            onClick={() => {
              setImageOpen(true);
            }}
            className="btn btn-primary"
          >
            افزودن عکس
          </div>
        )}
        {selectedImage && (
          <div className="relative">
            <div className=" w-full h-full absolute">
              <X
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="absolute top-3 right-3 text-error cursor-pointer hover:bg-error hover:text-white"
              />
            </div>
            <Image
              className="p-2"
              width={100}
              height={100}
              src={selectedImage.file || ""}
              alt={selectedImage.name}
            />
          </div>
        )}
        {errors?.name && (
          <div className="text-error text-xs -mt-1">
            {errors?.name?.message}
          </div>
        )}{" "}
        <select className="select w-full" {...register("category")}>
          {categories?.map((item) => (
            <option value={item?.id} key={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
        <TipTap
          onChange={(data) => {
            setValue("description", data);
          }}
          content={watch("description") ?? ""}
          className="col-span-2"
        />
        <button className="btn btn-neutral w-full">
          {CreateProductLoading || UpdateProductLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>ثبت</span>
          )}
        </button>
        {backendErrors?.map((err) => (
          <div key={err}>{err}</div>
        ))}
      </form>
    </>
  );
};
