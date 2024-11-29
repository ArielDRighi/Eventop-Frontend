"use client";

import { UserInfo } from "@/views/UserDashboard/UserInfo";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { Compras } from "@/components/Compras";
import { getRole } from "@/helpers/getRole";

const UserDashboard = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [roleError, setRoleError] = useState(null);

  useEffect(() => {
    if (!isLoading && user) {
      const fetchRole = async () => {
        try {
          const role = await getRole();
          setUserRole(role);
        } catch (error: any) {
          setRoleError(error.message);
          console.error("Error fetching role:", error);
        }
      };

      fetchRole();
    }
  }, [isLoading, user]);

  // Redirigir inmediatamente si no hay usuario y no está cargando
  if (!isLoading && !user) {
    if (typeof window !== "undefined") {
      router.push("/api/auth/login");
    }
    return <div>Loading...</div>;
  }

  // Mostrar un indicador de carga mientras se verifica el estado del usuario
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <UserInfo user={user} />
      <Compras user={user} />
      {userRole && <div>Role: {userRole}</div>}
      {roleError && <div>Error: {roleError}</div>}
    </div>
  );
};

export default UserDashboard;
