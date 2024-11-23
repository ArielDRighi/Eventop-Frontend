"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import React, { useState } from "react";
import { useAdmin } from "@/context/admincontext";
import { MenuIcon, XIcon } from "lucide-react";

const NavBar = () => {
  const { user } = useUser();
  const { isAdmin } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar lg:max-w-6xl mx-auto bg-gray-900 text-white relative">
      <div className="navbar-start">
        <Link href={"/"} className="text-xl font-bold">
          <span className="text-purple-500">E</span>ven
          <span className="text-purple-500">Top</span>
        </Link>
      </div>
      <div className="navbar-center lg:hidden">
        <details className="dropdown">
          <summary className="btn m-1 text-slate-900 focus:outline-none flex items-center">
            {menuOpen ? (
              <XIcon className="w-6 h-6" onClick={toggleMenu} />
            ) : (
              <MenuIcon className="w-6 h-6" onClick={toggleMenu} />
            )}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-slate-900">
            <li>
              <Link href={"/"}>
                  Inicio
              </Link>
            </li>
            <li>
              <Link href={"/events"}>
                Encuentra Eventos
              </Link>
            </li>
            <li>
              <Link href={"/ayuda"}>
                Ayuda
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link href={"/admin"}>
                  Admin
                </Link>
              </li>
            )}
            <li>
              <details>
                <summary>Argentina | ES</summary>
                <ul className="p-2 text-gray-900">
                  <li>
                    <a>Inglés</a>
                  </li>
                  <li>
                    <a>Italiano</a>
                  </li>
                  <li>
                    <a>Portugués</a>
                  </li>
                </ul>
              </details>
            </li>
            {user ? (
              <li>
                <Link href={"/micuenta"}>
                  Mi cuenta
                </Link>
              </li>
            ) : (
              <li>
                <Link href="/api/auth/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </details>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href={"/events"}>
              Encuentra Eventos
            </Link>
          </li>
          <li>
            <Link href={"/ayuda"}>
              Ayuda
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link href={"/admin"}>
                Admin
              </Link>
            </li>
          )}
          <li>
            <details>
              <summary>Argentina | ES</summary>
              <ul className="p-2 text-gray-900">
                <li>
                  <a>Inglés</a>
                </li>
                <li>
                  <a>Italiano</a>
                </li>
                <li>
                  <a>Portugués</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a
            className="btn bg-purple-500 text-white hover:bg-purple-600"
            href={"/micuenta"}
          >
            Mi Cuenta
          </a>
        ) : (
          <a
            className="btn bg-purple-500 text-white hover:bg-purple-600"
            href={"/api/auth/login"}
          >
            Inicia Sesión
          </a>
        )}
      </div>
    </nav>
  );
};

export default NavBar;