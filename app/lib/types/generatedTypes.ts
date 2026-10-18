import * as z from "zod";
import { CategorySchema } from "../schemas/category";
import { ProductSchema } from "../schemas/product";

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
