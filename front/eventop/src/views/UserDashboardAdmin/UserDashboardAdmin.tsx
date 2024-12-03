"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { useGetAllUsers } from "@/helpers/users.helpers";
import InfoUsersAdmin from "@/components/InfoUsersAdmin";

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const token = Cookies.get("accessToken");
      
      if (token) {
        try {
          const parsedToken = JSON.parse(token);
          const fetchedUsers = await useGetAllUsers(parsedToken, page, limit);
          setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const bannedUsers = users.filter((user) => user.isBanned);
  const unbannedUsers = users.filter((user) => !user.isBanned);

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-purple-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-slate-200 text-center mb-4">
          Usuarios Activos
        </h2>
        <InfoUsersAdmin userData={unbannedUsers} />
        {loading ? (
          <div className="text-center mt-4 text-slate-300">Cargando...</div>
        ) : (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver más
          </button>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 text-center mb-4 mt-4">
          Usuarios Baneados
        </h2>
        <InfoUsersAdmin userData={bannedUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
