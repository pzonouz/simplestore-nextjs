import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/app/lib/redux/features/api";
import { setModalId } from "@/app/lib/redux/features/modal";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { CategorySchema } from "@/app/lib/schemas/category";
import { Category } from "@/app/lib/types/generatedTypes";
import { translateError } from "@/app/lib/utils/translate";
import {
  NormalizeFrontToBack,
  setToasterSuccessMessage,
} from "@/app/lib/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
export const CategoryForm = () => {
  const id = useAppSelector((state) => state.modal.id);
  const modalType = useAppSelector((state) => state?.modal.type);

  const { data: categories } = useGetCategoriesQuery();
  const [createCategory, { isLoading: CreateCategoryLoading }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: UpdateCategoryLoading }] =
    useUpdateCategoryMutation();

  const values = useMemo(() => {
    return modalType == "EDIT"
      ? categories?.find((c) => c.id == id)
      : { name: "", parent: "", description: "", id: "" };
  }, [modalType, id]);

  const dispatch = useAppDispatch();
  const [backendError, setBackendError] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    values: values,
  });

  const submitHandler = (data: Category) => {
    const normalizedData = NormalizeFrontToBack(data);
    const action =
      modalType == "EDIT" && id
        ? updateCategory(normalizedData as Category)
        : createCategory(normalizedData as Category);
    action
      .unwrap()
      .then(() => {
        setBackendError("");
        reset();
        dispatch(setModalId(null));
        setToasterSuccessMessage(dispatch);
      })
      .catch((err) => {
        setBackendError("");
        const translated = translateError(err);
        if (translated) setBackendError(translated);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="fieldset grid grid-cols-2 gap-2 bg-base-200 border-base-300 rounded-box w-full border p-4"
    >
      <div className="grid grid-cols-1 gap-2">
        <input {...register("id")} type="text" className="hidden" />
        <input
          type="text"
          {...register("name")}
          className={clsx("input w-full", {
            "border-error placeholder:text-error": errors?.name,
          })}
          placeholder="نام"
        />
        {errors?.name && (
          <div className="text-error text-xs -mt-1">
            {errors?.name?.message}
          </div>
        )}
        <select {...register("parent")} className="select w-full">
          <option value="">بدون والد</option>
          {categories
            ?.filter((item) => item?.id != getValues("id"))
            ?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
        </select>
        <button className="btn btn-neutral w-full">
          {CreateCategoryLoading || UpdateCategoryLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>ثبت</span>
          )}
        </button>
      </div>
      <textarea
        {...register("description")}
        className="textarea w-full"
        placeholder="توضیحات"
      ></textarea>
      {backendError && (
        <div className="col-span-2 text-error">{backendError}</div>
      )}
    </form>
  );
};
