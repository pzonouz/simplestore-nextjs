import { FormTextInput } from "@/app/components/ui/FormTextInput";
import { LoadingButton } from "@/app/components/ui/LoadingButton";
import { useRegisterUserMutation } from "@/app/lib/redux/features/api";
import { RegisterSchema } from "@/app/lib/schemas/auth";
import { translateError } from "@/app/lib/utils/translate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const EmailRegister = () => {
  const [backendError, setBackendError] = useState<string>("");
  const [successAlert, setSuccessAlert] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  return (
    <form
      onSubmit={handleSubmit((data) => {
        registerUser(data)
          .unwrap()
          .then(() => {
            setSuccessAlert(
              "ثبت نام با موفقیت انجام شد. برای فعالسازی لطفا ایمیل خود و مخصوصا بخش اسپم را چک  کنید",
            );
            setBackendError("");
          })
          .catch((err) => {
            setBackendError(translateError(err));
          });
      })}
      className="w-full flex flex-col gap-2 items-start"
    >
      <FormTextInput
        placeholder="ایمیل"
        error={errors.email}
        register={register("email")}
      />
      <FormTextInput
        placeholder="پسورد"
        error={errors.password}
        register={register("password")}
        type="password"
      />
      <FormTextInput
        placeholder="پسورد"
        error={errors.rePassword}
        register={register("rePassword")}
        type="password"
      />
      {backendError && <p className="text-error">{backendError}</p>}
      {successAlert && <p className="text-success">{successAlert}</p>}
      <LoadingButton classname="w-full" text="ثبت" loading={isLoading} />
    </form>
  );
};
