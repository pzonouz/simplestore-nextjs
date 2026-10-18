"use client"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation"
import * as z from "zod"
import {useSearchParams} from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

const loginSchema = z.object({
    email: z.string().min(1, {message: "ایمیل را وارد کنید"}),
    password: z.string().min(1, {message: "پسورد را وارد کنید"})
})

const Page = () => {
    const {formState: {errors}, register, handleSubmit} = useForm({resolver: zodResolver(loginSchema)})
    const query = useSearchParams()
    const callback = query.get("callback")
    const router = useRouter()
    return (
        <form onSubmit={handleSubmit((data) => {
            fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login/`, {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(data)
            }).then(() => {
                window.location.href = callback ? `/${callback}` : "/profile"
            }).catch((err) => {
            })
        })} className="flex flex-col gap-2 w-full max-w-lg  my-26 mx-auto justify-center">
            <label className=" text-lg font-bold text-center my-4 w-full">ورود</label>
            <input {...register("email")} type="text" className={clsx("input w-full", {"border-error": errors.email})}
                   placeholder="ایمیل"/>
            <p className="-mt-2 text-error text-right text-sm">{errors.email?.message}</p>
            <input {...register("password")} type="password"
                   className={clsx("input w-full", {"border-error": errors.password})} placeholder="پسورد"/>
            <p className="-mt-2 text-error text-right text-sm">{errors.password?.message}</p>
            <button type="submit" className="btn btn-primary w-full">ثبت</button>
            <div className="flex items-center justify-between"><Link href="/auth/ergister">ایجاد حساب</Link><Link
                href="/auth/reset">فراموشی رمز</Link></div>
        </form>
    )
}
export default Page
