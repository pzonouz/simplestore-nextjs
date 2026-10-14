"use client";
import { Suspense, useState } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create the store instance the first time this renders
  const [store] = useState<AppStore>(makeStore);

  return (
    // <Suspense fallback={null}>
    <Provider store={store}>{children}</Provider>
    // </Suspense>
  );
}
