import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../../types/modal";

export interface ModalState {
  id: string | null;
  type: ModalType;
}

const initialState: ModalState = {
  id: null,
  type: "EDIT",
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalId: (state, action: PayloadAction<string | null>) => {
      state.id = action?.payload;
    },
    setModalType: (state, action: PayloadAction<ModalType>) => {
      state.type = action.payload;
    },
  },
});

export const { setModalId, setModalType } = ModalSlice.actions;
export default ModalSlice.reducer;
