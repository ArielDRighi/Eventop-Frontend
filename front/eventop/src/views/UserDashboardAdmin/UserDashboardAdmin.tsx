"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { useGetAllUsers } from "@/helpers/users.helpers";
import InfoUsersAdmin from "@/components/InfoUsersAdmin";

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");

    if (token) {
      const fetchUsers = async () => {
        try {
          const users = await useGetAllUsers(token);
          // Mockear la propiedad isBanned
          const usersWithBannedStatus = users.map((user: IUser) => ({
            ...user,
            isBanned: Math.random() < 0.5, // Mockear con un valor aleatorio
          }));
          setUsers(usersWithBannedStatus);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    } else {
      setLoading(false);
    }
  }, []);

  const bannedUsers = users.filter((user) => user.isBanned === true);
  const unbannedUsers = users.filter((user) => user.isBanned === false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          type="button"
          className="bg-purple-500 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]"
          disabled
        >
          <div className="flex items-center justify-center m-[10px]">
            <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
          </div>
          Cargando...
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 text-center mb-4">Usuarios Activos</h2>
        <InfoUsersAdmin userData={unbannedUsers} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 text-center mb-4 mt-4">Usuarios Baneados</h2>
        <InfoUsersAdmin userData={bannedUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
