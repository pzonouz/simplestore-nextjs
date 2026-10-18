export type ErrorType = { data: { errors: { detail: string }[] } };
export const translateError = (err: ErrorType) => {
  const errors: string[] = [];
  err.data.errors.map((item) => {
    if (item.detail.includes("category with this name already exists")) {
      errors.push("نام دسته بندی تکراری است");
    }
    if (item.detail.includes("product with this name already exists")) {
      errors.push("نام کالا تکراری است");
    }
    if (item.detail.includes("protected foreign keys")) {
      errors.push("اول وابستگی ها را حذف کنید");
    }
  });
  return errors;
};
