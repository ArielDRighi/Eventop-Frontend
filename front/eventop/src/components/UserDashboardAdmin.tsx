"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { useGetAllUsers } from "@/helpers/users.helpers";

const Dashboard = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState("Administrador");

  useEffect(() => {
    const token = JSON.parse(Cookies.get("adminToken") || "null" );

    if (token) {
      const fetchUsers = async () => {
        try {
          const users = await useGetAllUsers(token);
          setUsers(users);
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
  }, [currentUserRole]);

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
    <div className="bg-gray-900 p-8 rounded-md w-full">
      <div className="flex items-center justify-between pb-6 flex-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <h2 className="text-white font-semibold text-lg">Usuarios</h2>
        </div>

        <span className="text-xs mt-1 sm:mt-0 sm:ml-2 font-semibold">
          Todos los usuarios registrados
        </span>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 sm:space-x-8">
          <button className="bg-purple-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
            Edit
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Creación
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User ID
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.role}
                    </p>
                  </td>

                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">fecha</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold ${
                        user.status === "Activo"
                          ? "text-green-900"
                          : "text-red-900"
                      } leading-tight`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 ${
                          usuario.status === "Activo"
                            ? "bg-green-200 opacity-50"
                            : "bg-red-200 opacity-50"
                        } rounded-full`}
                      ></span>
                      <span className="relative">{usuario.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {user.userId}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
