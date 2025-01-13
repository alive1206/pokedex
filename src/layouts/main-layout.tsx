import { Header } from "@/components";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-104px)] relative top-[150px] container  overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
