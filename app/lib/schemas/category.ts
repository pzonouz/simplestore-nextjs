import * as z from "zod";
export const CategoryCreateSchema = z.object({
  name: z.string().min(1, { error: "نام را وارد کنید" }),
  parent: z.string().nullable().nullish(),
  description: z.string().nullable().nullish(),
});
export const CategorySchema = CategoryCreateSchema.extend({ id: z.string() });
