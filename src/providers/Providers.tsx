"use client";

import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
