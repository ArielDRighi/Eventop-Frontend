"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  ArrowLeftCircleIcon,
  LayoutDashboard,
  LogOut,
  Ticket,
  User,
  ChevronDown,
  Calendar,
  HelpCircle,
  Pin,
  Drama,
} from "lucide-react";

const SideBar = () => {
  const router = useRouter();
  const { setRole } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsLargeScreen(true);
      } else {
        setIsLargeScreen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSingOut = () => {
    Cookies.remove("accessToken");
    setRole("");
    router.push("/");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="setting-btn fixed top-4 left-4  z-50 p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          aria-label="Toggle Sidebar"
        >
          <span className="bar bar1"></span>
          <span className="bar bar2"></span>
          <span className="bar bar1"></span>
        </button>
      )}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out ${
          isOpen && isLargeScreen
            ? "opacity-100 pointer-events-auto backdrop-blur-sm"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out bg-gray-900 text-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Link
              href="/admin"
              className="flex items-center space-x-2 text-xl font-semibold"
            >
              <span>
                Even<span className="text-purple-500">Top</span>
              </span>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:text-purple-600 text-xl text-purple-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-colors duration-200"
              aria-label="Close Sidebar"
            >
              <ArrowLeftCircleIcon className="w-8 h-8" />
            </button>
          </div>

          <nav className="flex-grow py-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsEventsOpen(!isEventsOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <Ticket className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                    <span>Eventos</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isEventsOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {isEventsOpen && (
                  <ul className="mt-2 space-y-1 px-4 animate-fadeIn">
                    <li>
                      <Link
                        href="/admin/events"
                        className="block py-2 pl-9 pr-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
                      >
                        Todos los eventos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/events/create-event"
                        className="block py-2 pl-9 pr-4 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200"
                      >
                        Crear evento
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link
                  href="https://calendar.google.com/calendar/u/0/r?pli=1"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <Calendar className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Calendario</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/locations"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <Pin className="w-5 h-5 mr-3 group-hover:bounce transition-transform duration-200" />
                  <span>Locaciones</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/categories"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <Drama className="w-5 h-5 mr-3 group-hover:bounce transition-transform duration-200" />
                  <span>Categorias</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
                >
                  <HelpCircle className="w-5 h-5 mr-3 group-hover:bounce transition-transform duration-200" />
                  <span>Ayuda</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleSingOut}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Cerrar sesion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
