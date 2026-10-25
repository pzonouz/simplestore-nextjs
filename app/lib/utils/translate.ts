export const translateError = (err: { data: string }) => {
  if (err?.data?.includes("category with this name already exists")) {
    return ("نام دسته بندی تکراری است");
  }
  if (err?.data?.includes("product with this name already exists")) {
    return ("نام کالا تکراری است");
  }
  if (err?.data?.includes("protected foreign keys")) {
    return ("اول وابستگی ها را حذف کنید");
  }
  if (err?.data?.includes(`duplicate key value violates unique constraint "users_email_key" (SQLSTATE 23505)\n`)) {
    return ("ایمیل قبلا وجود دارد");
  }
  if (err?.data?.includes(`duplicate key value violates unique constraint "categories_name_key"`)) {
    return ("نام تکراری است");
  }
  if (err?.data?.includes(`duplicate key value violates unique constraint "files_name_key" `)) {
    return ("نام تکراری است");
  }
  return err?.data
};
