import * as z from "zod";
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "نام را وارد کنید" }),
  slug: z.string().min(1, { message: "مسیر را وارد کنید" }),
  description: z.string().nullable().nullish(),
  imageUrl: z.string().nullable().nullish(),
  category: z.string().min(1, { message: "دسته بندی را وارد کنید" }),
  categoryName: z.string().nullable().nullish().optional()
});
