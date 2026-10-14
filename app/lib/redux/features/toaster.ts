import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ToasterType } from "../../types/toaster";

export interface ToasterState {
  text: string | null;
  type: ToasterType;
  enable: boolean;
}

const initialState: ToasterState = {
  text: "با موفقیت انجام شد",
  type: "Success",
  enable: false,
};

export const ToasterSlice = createSlice({
  name: "toaster",
  initialState,
  reducers: {
    setToasterText: (state, action: PayloadAction<string | null>) => {
      state.text = action?.payload || "با موفقیت انجام شد";
    },
    setToasterType: (state, action: PayloadAction<ToasterType>) => {
      state.type = action.payload;
    },
    setToasterEnable: (state, action: PayloadAction<boolean>) => {
      state.enable = action.payload;
    },
  },
});

export const { setToasterEnable, setToasterText, setToasterType } =
  ToasterSlice.actions;
export default ToasterSlice.reducer;
