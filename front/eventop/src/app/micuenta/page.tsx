"use client";

import { UserInfo } from "@/views/UserDashboard/UserInfo";
import React, { useEffect } from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { Compras } from "@/components/Compras";

const UserDashboard = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  // Redirigir inmediatamente si no hay usuario y no está cargando
  if (!isLoading && !user) {
    if (typeof window !== "undefined") {
      router.push("/api/auth/login");
    }
    return <div className="flex items-center justify-center space-x-2">
          
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
  </div>
  }

  // Mostrar un indicador de carga mientras se verifica el estado del usuario
  if (isLoading) {
    return <div className="flex items-center justify-center space-x-2">
          
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
  </div>
  }

  return (
    <>
      <Head>
        <title>Dashboard de Usuario</title>
        <meta name="description" content="Panel de control de usuario" />
      </Head>
      <UserInfo />
      <div className="w-1/2 mx-auto">
      <Compras/>
      </div>
    </>
  );
};

export default UserDashboard;