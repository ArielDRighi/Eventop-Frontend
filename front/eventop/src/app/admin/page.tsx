"use client";
import { useEffect, useState } from "react";
import DashboardAdminSection from "@/components/DashboardAdminSection";
import Login from "@/views/Login/Login";
import SideBar from "@/components/SideBar";
import Cookies from "js-cookie";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const admin = Cookies.get("adminToken");
    if (admin) {
      setIsAdmin(true);
    }
    setCheckedAuth(true);
  }, []);

  if (checkedAuth && !isAdmin) {
    return <Login />;
  }

  if (!checkedAuth) {
    return (
      <div className="flex flex-row justify-center items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }

  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <SideBar />
        <div className="p-6 justify-center text-center">
          <h1 className="text-3xl font-semibold">Panel de Administración</h1>
        </div>
        <DashboardAdminSection />
      </div>
    </div>
  );
};

export default AdminPage;
