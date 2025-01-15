import { Footer, Header } from "@/components";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-full">
      <Header />
      <div className="min-h-[calc(100vh-178px-150px)] relative z-1 top-[150px] container px-4 max-[576px]:pb-16">
        {children}
      </div>
      <Footer />
    </div>
  );
};
