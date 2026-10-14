import * as z from "zod";
import { CategoryCreateSchema, CategorySchema } from "../schemas/category";

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>;
export type Category = z.infer<typeof CategorySchema>;
