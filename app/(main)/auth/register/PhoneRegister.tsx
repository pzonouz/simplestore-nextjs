import {
  useGetOTPMutation,
  useRegisterUserMutation,
} from "@/app/lib/redux/features/api";
import clsx from "clsx";
import { useState } from "react";

export const PhoneRegister = () => {
  const [backendErrors, setBackendErrors] = useState<string[]>([]);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [getOTP, { isLoading: OTPLoading }] = useGetOTPMutation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [otp, setOtp] = useState(false);

  return (
    <div className="w-full flex py-8 flex-row items-center overflow-x-hidden ">
      <div
        className={clsx(
          "shrink-0 flex flex-col w-full gap-4 items-center justify-center  transition-all duration-1000 ease-in-out",
          otp ? "translate-x-full" : "translate-x-0",
        )}
      >
        <input
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.currentTarget.value);
          }}
          className={clsx("input w-full outline-0", {
            "text-error": phoneNumberError,
          })}
          type="text"
          placeholder="شماره همراه"
        />
        {phoneNumberError && <p className="text-error">{phoneNumberError}</p>}
        <button
          onClick={() => {
            if (!phoneNumber.match(/^09\d{9}$/)) {
              return setPhoneNumberError("ساختار شماره همراه درست نیست");
            }
            setPhoneNumberError("");
            getOTP({ phoneNumber: phoneNumber });
            setOtp(true);
          }}
          className="btn btn-primary w-full"
        >
          {OTPLoading ? (
            <div className="loading loading-spinner"></div>
          ) : (
            <div>دریافت کد</div>
          )}
        </button>
      </div>
      <div
        className={clsx(
          "shrink-0 flex flex-col w-80 gap-4 items-center justify-center  transition-all duration-1000 ease-in-out",
          otp ? "translate-x-80" : "translate-x-0",
        )}
      >
        <label className="otp">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <input
            type="text"
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]{4}"
            required
          />
        </label>
      </div>
    </div>
  );
};
