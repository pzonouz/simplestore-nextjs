import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./features/api";
import { ToasterSlice } from "./features/toaster";
import { ModalSlice } from "./features/modal";

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      [api.reducerPath]: api.reducer,
      toaster: ToasterSlice.reducer,
      modal: ModalSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
