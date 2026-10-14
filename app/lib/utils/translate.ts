import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { isArray } from "util";

export const translateError = (err: FetchBaseQueryError) => {
  const errors: string[] = [];
  if (err.status == 400) {
    const entries = Object.entries(err?.data as Object);
    entries?.map((entry) => {
      if (isArray(entry)) {
        entry?.map((item) => {
          if (isArray(item)) {
            item?.map((i) => {
              switch (i) {
                case "category with this name already exists.":
                  errors.push("نام دسته بندی تکراری است");
              }
            });
          }
        });
      }
    });
  }
  if (err.originalStatus == 500) {
    const data: string = err.data as string;
    if (data.includes("ProtectedError") && data.includes("categories")) {
      errors.push("اول زیردسته ها را حذف کنید");
    }
  }
  return errors;
};
