"use client";

import { UserInfo } from "@/views/UserDashboard/UserInfo";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Compras } from "@/components/Compras";
import { useUserContext } from "@/context/userContext";
import Cookies from "js-cookie";

const UserDashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { userName, role } = useUserContext();

  useEffect(() => {
    console.log(userName);
    if (userName === null) {
      // router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>User Dashboard</title>
        <meta
          name="description"
          content="Dashboard personalizado para usuarios registrados."
        />
      </Head>
      <section>
        <h1 className="text-3xl text-center text-slate-200">Hola {userName}</h1>
        {/* <UserInfo user={userName} role={role} /> */}
        {/* Descomentar cuando el componente Compras esté listo */}
        {/* userName && <Compras user={userName} /> */}
        {role ? <div>Role: {role}</div> : <div>No role assigned</div>}
        <button
          className="bg-slate-200 text-white p-2 rounded-md"
          onClick={() => Cookies.remove("accessToken")}
        >
          Logout
        </button>
      </section>
    </>
  );
};

export default UserDashboard;
