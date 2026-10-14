import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, CategoryCreate } from "../../types/generatedTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `categories/`,
      providesTags: ["categories"],
    }),
    createCategory: builder.mutation<void, CategoryCreate>({
      query: (body) => ({
        url: "categories/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation<
      Category,
      Partial<Category> & Pick<Category, "id">
    >({
      query: ({ id, ...patch }) => ({
        url: `categories/${id}/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation<void, Pick<Category, "id">>({
      query: ({ id }) => ({
        url: `categories/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = api;
