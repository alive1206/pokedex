import { Header } from "@/components";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-200px)] relative z-1 top-[150px] overflow-x-hidden overflow-y-auto container">
        {children}
      </div>
    </div>
  );
};
