import * as z from "zod";
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, { error: "نام را وارد کنید" }),
  parent: z.string().nullable().nullish(),
  parentName: z.string().nullable().nullable().optional(),
  description: z.string().nullable().nullish(),
  imageUrl: z.string().nullable().nullish(),
});
