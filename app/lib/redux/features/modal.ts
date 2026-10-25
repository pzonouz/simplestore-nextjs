import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ModalEntity, ModalType } from "../../types/modal";

export interface ModalState {
  id: string | null;
  type: ModalType;
  entity: ModalEntity
}

const initialState: ModalState = {
  id: null,
  type: "EDIT",
  entity: null
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
    setModalEntity: (state, action: PayloadAction<ModalEntity>) => {
      state.entity = action.payload;
    },
  },
});

export const { setModalId, setModalType, setModalEntity } = ModalSlice.actions;
export default ModalSlice.reducer;
