import * as z from "zod"

export const RegisterSchema = z
    .object({
        email: z
            .email({ message: "ساختار ایمیل درست نیست" })
            .min(1, { message: "ایمیل را وارد کنید" }),
        username: z.string().optional(),
        password: z.string().min(8, { message: "حداقل ۸ کاراکتر وارد کنید" }),
        rePassword: z.string().min(8, { message: "حداقل ۸ کاراکتر وارد کنید" }),
    })
    .superRefine((val, ctx) => {
        if (val.password && val.rePassword && val.password !== val.rePassword) {
            ctx.addIssue({
                path: ["rePassword"],
                code: "custom",
                message: "پسورد ها مطابقت ندارد",
            });
        }
    });
export const LoginSchema = z.object({
    email: z.string().min(1, { message: "ایمیل را وارد کنید" }),
    password: z.string().min(1, { message: "پسورد را وارد کنید" }),
});

