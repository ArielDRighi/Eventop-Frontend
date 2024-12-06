"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { getAllUsers } from "@/helpers/users.helpers";
import InfoUsersAdmin from "@/components/InfoUsersAdmin";

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 50;

  const fetchUsers = async () => {
    setLoading(true);
    const token = Cookies.get("accessToken");

    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        const fetchedUsers = await getAllUsers(parsedToken, page, limit);
        console.log("fetchedUsers:", fetchedUsers);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const bannedUsers = filteredUsers.filter((user) => user.isBanned);
  const unbannedUsers = filteredUsers.filter((user) => !user.isBanned);

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
      <div className="flex flex-col items-center mt-10 ">
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Usuarios Activos
        </h2>
        <input
          type="text"
          placeholder="Buscar por email"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 mb-4 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
        />
        <div className="overflow-y-auto h-[600px] lg:max-w-7xl md:max-w-4xl w-full p-7 bg-gray-900 shadow-xl border border-gray-700 rounded-md">
          <InfoUsersAdmin userData={unbannedUsers} onUpdate={fetchUsers}/>
        </div>
        {loading ? (
          <div className="text-center mt-4 text-slate-300">Cargando...</div>
        ) : (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-purple-500 hover:bg-purple-700 text-slate-200  font-bold py-2 px-4 rounded mt-2"
          >
            Ver más
          </button>
        )}
      </div>
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mt-10">
          Usuarios Baneados
        </h2>
        <div className="overflow-y-auto h-[600px] lg:max-w-7xl md:max-w-4xl w-full p-7 bg-gray-900 shadow-xl border border-gray-700 rounded-md">
          <InfoUsersAdmin userData={bannedUsers} onUpdate={fetchUsers}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
