import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";

interface AppLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  showFloatingActions?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showNavbar = true,
  showFooter = true,
  showFloatingActions = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
      {showFloatingActions && <FloatingActions />}
    </div>
  );
};

export default AppLayout;
