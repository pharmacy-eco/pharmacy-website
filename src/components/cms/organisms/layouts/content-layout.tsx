import { Navbar } from "./navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="w-full pt-8 pb-8 px-4 sm:px-8 bg-blue-ea min-h-[calc(100vh-56px)]">{children}</div>
    </div>
  );
}
