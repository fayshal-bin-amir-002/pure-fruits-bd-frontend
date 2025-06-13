import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return <div className="px-4">{children}</div>;
};

export default CommonLayout;
