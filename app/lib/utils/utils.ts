"use client";

import { PayloadAction } from "@reduxjs/toolkit";
import {
  setToasterEnable,
  setToasterText,
  setToasterType,
} from "../redux/features/toaster";
import { successMessage } from "./constants";

export const setToasterSuccessMessage = (dispatch: any) => {
  dispatch(setToasterType("Success"));
  dispatch(setToasterText(successMessage));
  dispatch(setToasterEnable(true));
};
export const setToasterErrorMessage = (
  message: string | string[],
  dispatch: any,
) => {
  dispatch(setToasterType("Error"));
  if (typeof message == "string") {
    dispatch(setToasterText(message));
  } else {
    dispatch(setToasterText(message.join("  ")));
  }
  dispatch(setToasterEnable(true));
};

export const Slugify = (name: string) => {
  return name.replaceAll(" ", "_")
}

export const NormalizeFrontToBack = (data: Record<string, any>): Record<string, any> => {
  const output: Record<string, any> = {}
  for (const [key, value] of Object.entries(data)) {
    output[key] = value === "" ? null : value
  }
  return output
}