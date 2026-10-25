"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useGetOTPMutation,
  useRegisterUserMutation,
} from "@/app/lib/redux/features/api";

import { PhoneRegister } from "./PhoneRegister";
import { EmailRegister } from "./EmailRegister";

const page = () => {
  const [registerMethod, setRegisterMethod] = useState<"EMAIL" | "PHONE">(
    "PHONE",
  );
  return (
    <div className="flex items-center mt-2 mb-12 gap-3 flex-col w-96 mx-auto">
      <label className=" text-lg font-bold text-center my-4 w-full">
        ثبت نام
      </label>
      <div className="w-full flex flex-col items-center">
        {registerMethod == "PHONE" ? <PhoneRegister /> : <EmailRegister />}
      </div>
      <div className="w-full flex items-start">
        {registerMethod == "PHONE" && (
          <div
            className="btn btn-success"
            onClick={() => {
              setRegisterMethod("EMAIL");
            }}
          >
            ثبت نام با ایمیل
          </div>
        )}
        {registerMethod == "EMAIL" && (
          <div
            className="btn btn-success"
            onClick={() => {
              setRegisterMethod("PHONE");
            }}
          >
            ثبت نام با شماره تلفن
          </div>
        )}
      </div>
    </div>
  );
};
export default page;
