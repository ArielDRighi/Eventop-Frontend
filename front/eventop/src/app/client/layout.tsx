import SideBarClient from "@/components/SideBarClient";
import React from "react";

const clientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="eventos-layout bg-gray-900">
      <main>
        <SideBarClient/>
        {children}
      </main>
    
    </div>
  );
};

export default clientLayout;