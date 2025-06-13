import HomePage from "@/components/modules/home/HomePage";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <HomePage>{children}</HomePage>;
};

export default CommonLayout;
