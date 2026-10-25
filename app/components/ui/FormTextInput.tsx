import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export const FormTextInput = ({
  register,
  error,
  type = "text",
  placeholder,
}: {
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute;
  placeholder: string;
}) => {
  return (
    <>
      <input
        {...register}
        type={type}
        className={clsx("input w-full outline-0", {
          "border-error input-error": error,
        })}
        placeholder={placeholder}
      />
      <p className="-mt-2 text-error text-right text-sm">{error?.message}</p>
    </>
  );
};
