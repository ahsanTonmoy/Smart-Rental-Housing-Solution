import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {/* navbar */}
      <Navbar />
      {/* main content */}
      <div className=" min-h-screen">{children}</div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
