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
          const usersWithBannedStatus = users.map((user: IUser) => ({
            ...user,
            isBanned: Math.random() < 0.5,
          }));
          setUsers(usersWithBannedStatus);
        } catch (error) {
          setLoading(false);
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
      <div>
        <h2 className="text-2xl font-semibold text-slate-200 text-center mb-4">
          Usuarios Activos
        </h2>
        <InfoUsersAdmin userData={unbannedUsers} />
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
