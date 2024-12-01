"use client";

import  UserInfo  from "@/views/UserDashboard/UserInfo";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/users.helpers"; // Renombrado para evitar confusión
import { IUserProfile } from "@/interfaces/IUser";

const UserDashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useUserContext();

  const token = Cookies.get("accessToken");

  // Validar existencia de token y userId antes de continuar
  
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    // Función para obtener los datos del usuario
    const fetchUser = async () => {
      try {
        const parsedToken = JSON.parse(token);
        if (typeof parsedToken !== "string") {
          throw new Error("Invalid token format");
        }
        const res = await getUserById(parsedToken, userId as string);
        setUserData(res);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Renderizar estados de carga o error
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Renderizar la vista principal
  return (
    <div>
      <Head>
        <title>User Dashboard</title>
      </Head>
      <UserInfo user={userData} /> {/* Cambiado a userData */}
    </div>
  );
};

export default UserDashboard;
