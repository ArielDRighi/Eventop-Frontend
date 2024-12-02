"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  ArrowLeftCircleIcon,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Ticket,
  User,
} from "lucide-react";
import { useUserContext } from "@/context/userContext";

const SideBar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { setRole } = useUserContext();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSingOut = () => {
    Cookies.remove("accessToken");
    setRole(null);
    router.push("/");
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="p-1 text-white bg-purple-500 rounded-md m-2"
      >
        <MenuIcon />
      </button>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left->0 z-40 w-64 h-screen transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 ">
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-1 text-white hover:text-white  "
          >
            <ArrowLeftCircleIcon />
          </button>

          <ul className="space-y-2 text-white font-medium mt-10">
            <li>
              <Link
                href="/admin"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <User />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <div className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
                <Ticket />
                <details className="dropdown">
                  <summary className="cursor-pointer border-none list-none px-2">
                    Events
                  </summary>
                  <ul className="menu dropdown-content  bg-gray-700 rounded-box z-[1] w-52 p-2 shadow">
                    <li>
                      <Link href="/admin/events">Events</Link>
                    </li>
                    <li>
                      <Link href="/admin/events/create-event">Crear</Link>
                    </li>
                    <li>
                      <Link href="/admin/events/edit-event">Editar</Link>
                    </li>
                  </ul>
                </details>
              </div>
            </li>
            <li>
              <button
                onClick={handleSingOut}
                className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
              >
                <LogOut />
                <p className="flex-1 ms-3 whitespace-nowrap">Sign Out</p>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
