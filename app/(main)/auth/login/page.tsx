"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FormTextInput } from "@/app/components/ui/FormTextInput";
import { LoginSchema, RegisterSchema } from "@/app/lib/schemas/auth";
import { useLoginMutation } from "@/app/lib/redux/features/api";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { setToasterSuccessMessage } from "@/app/lib/utils/utils";
import { successMessage } from "@/app/lib/utils/constants";

const Page = () => {
  const query = useSearchParams();
  const callback = query.get("next");
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(LoginSchema) });
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        login(data)
          .unwrap()
          .then(() => {
            setToasterSuccessMessage(dispatch);
            if (callback) {
              router.replace(callback);
            } else {
              router.replace("/profile");
            }
          })
          .catch(() => {});
      })}
      className="flex flex-col gap-4 w-full max-w-lg mt-12 mb-40 mx-auto justify-center"
    >
      <label className=" text-lg font-bold text-center w-full">ورود</label>
      <FormTextInput
        error={errors.email}
        placeholder="ایمیل"
        register={register("email")}
        type="text"
      />
      <FormTextInput
        error={errors.password}
        placeholder="پسورد"
        register={register("password")}
        type="password"
      />
      <button className="btn btn-primary w-full">ثبت</button>
      <div className="flex items-center justify-between">
        <Link href="/auth/register">ایجاد حساب</Link>
        <Link href="/auth/reset">فراموشی رمز</Link>
      </div>
    </form>
  );
};
export default Page;
