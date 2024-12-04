import React from "react";
import { IUser } from "@/interfaces/IUser";

interface InfoUsersAdminProps {
  userData: IUser[];
}

const InfoUsersAdmin: React.FC<InfoUsersAdminProps> = ({ userData }) => {
  const users = userData;

  return (
    <div className="bg-gray-800 p-8 rounded-md w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between pb-6 flex-wrap">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <h2 className="text-white font-semibold text-lg">Usuarios</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div key={user.userId} className="bg-gray-700 p-4 rounded-lg shadow-md max-w-xs mx-auto">
            <div className="flex flex-col items-center">
              <img
                src={user.imageUrl || "/user-placeholder.webp"}
                alt={user.name}
                className="w-24 h-24 bg-gray-500 rounded-full mb-4 object-cover"
              />
              <h3 className="text-white font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-300">{user.email}</p>
              <p className="text-gray-400 text-sm">Rol: {user.role}</p>
              <p className="text-gray-400 text-sm">Creado: {new Date(user.createdAt).toLocaleDateString()}</p>
              <span
                className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                  user.isBanned ? "text-red-900" : "text-green-900"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 opacity-50 rounded-full ${
                    user.isBanned ? "bg-red-200" : "bg-green-200"
                  }`}
                ></span>
                <span className="relative">{user.isBanned ? "Banned" : "Active"}</span>
              </span>
              <div className="mt-4 flex space-x-2">
                <button className="bg-purple-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Edit
                </button>
                <button className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  Suspender
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoUsersAdmin;
