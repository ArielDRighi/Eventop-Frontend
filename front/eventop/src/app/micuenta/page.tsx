"use client";

import UserInfo from "@/views/UserDashboard/UserInfo";
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
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken") || "null";
  const [error, setError] = useState<string | null>(null);

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
        if (!userId) {
          throw new Error("User ID is null");
        }
        const res = await getUserById(parsedToken, userId);
        console.log(res);
        setUserData(res);
      } catch (error: any) {
        console.error("Error fetching user:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, router, token]);

  // Renderizar estados de carga o error
  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
      </div>
    );
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
