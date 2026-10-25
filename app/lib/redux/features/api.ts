import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Category,
  Login,
  Product,
  RegisterUser,
} from "../../types/generatedTypes";
import { File } from "../../types/file";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["categories", "products", "files", "users"],
  endpoints: (builder) => ({
    // Categories
    getCategories: builder.query<Category[], void>({
      query: () => `categories/`,
      providesTags: ["categories"],
    }),
    getNoChildrenCategories: builder.query<Category[], void>({
      query: () => `categories/no_children_categories/`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<void, Category>({
      query: (body) => ({
        url: "categories/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation<Category, Partial<Category> & Pick<Category, "id">>({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<void, Pick<Category, "id">>({
      query: ({ id }) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    // Products
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      providesTags: ["products"],
    }),
    createProduct: builder.mutation<void, Product>({
      query: (body) => ({
        url: "products/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & Pick<Product, "id">>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation<void, Pick<Product, "id">>({
      query: ({ id }) => ({
        url: `products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    createFile: builder.mutation<void, { name: string, url: string }>({
      query: (body) => ({
        url: "/files",
        method: "POST",
        body: body
      }),
      invalidatesTags: ["files"]
    }),
    getFiles: builder.query<File[], void>({ query: () => "files/", providesTags: ["files"] }),
    getImages: builder.query<File[], void>({ query: () => "files/?type=image", providesTags: ["files"] }),
    deleteFile: builder.mutation<void, Pick<File, "id">>({
      query: ({ id }) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["files"]
    }),
    registerUser: builder.mutation<void, RegisterUser>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    login: builder.mutation<void, Login>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    getOTP: builder.mutation<{ code: string }, { phoneNumber: string }>({
      query: (body) => ({
        url: "authentication/otp/",
        method: "POST",
        body
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetNoChildrenCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetFilesQuery,
  useCreateFileMutation,
  useDeleteFileMutation,
  useRegisterUserMutation,
  useGetOTPMutation,
  useLoginMutation
} = api;
