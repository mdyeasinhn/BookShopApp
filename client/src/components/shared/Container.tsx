import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
