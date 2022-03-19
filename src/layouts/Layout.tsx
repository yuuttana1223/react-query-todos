import { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-mono text-sm text-gray-600">
      {children}
    </div>
  );
};
