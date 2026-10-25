import * as z from "zod";
import { CategorySchema } from "../schemas/category";
import { ProductSchema } from "../schemas/product";
import { LoginSchema, RegisterSchema } from "../schemas/auth";

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type RegisterUser = z.infer<typeof RegisterSchema>
export type Login = z.infer<typeof LoginSchema>
