import React from "react";
import { IUser } from "@/interfaces/IUser";
import SuspendButton from "./SuspendButton";
import ActiveButton from "./ActiveButton";
import Image from "next/image";
import Cookies from "js-cookie";
import { changeUserRole } from "@/helpers/users.helpers";
import { useState } from "react";

interface InfoUsersAdminProps {
  userData: IUser[];
  onUpdate: () => void;
}

const InfoUsersAdmin: React.FC<InfoUsersAdminProps> = ({
  userData,
  onUpdate,
}) => {
  const [selectedRole, setSelectedRole] = useState<{ [key: number]: string }>(
    {}
  );
  const handleRoleChange = (userId: number, newRole: string) => {
    setSelectedRole((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleRoleUpdate = async (userId: number) => {
    const newRole = selectedRole[userId];
    if (!newRole) return;
    const token = Cookies.get("accessToken") || "null";
    const parsedToken = JSON.parse(token);
    const data = {
      role: newRole,
    };
    try {
      const res = await changeUserRole(parsedToken, userId, data);
      console.log("res:", res);
      onUpdate();
    } catch (error) {
      console.error("Error al actualizar el rol del usuario:", error);
    }
  };

  const users = userData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {users.map((user) => (
        <div
          key={user.userId}
          className="bg-gray-700 p-4 rounded-lg shadow mx-auto w-[200px]"
        >
          <div className="flex flex-col items-center justify-evenly">
            <Image
              src={user.imageUrl || "/user-placeholder.webp"}
              alt={user.name}
              width={100}
              height={100}
              className="w-24 h-24 bg-gray-500 rounded-full mb-4 object-cover"
            />
            <h3 className="text-white font-semibold text-md">{user.name}</h3>
            <p className="text-gray-300 text-xs">{user.email}</p>
            <p className="text-gray-400 text-sm">
              Creado: {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <div className="mt-2 text-center">
              <select
                value={selectedRole[user.userId] || user.role}
                onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                className="bg-gray-800 text-slate-200 rounded-lg px-2 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
                <option value="client">Cliente</option>
              </select>
              <button
                onClick={() => handleRoleUpdate(user.userId)}
                className="group mt-1 font-mono text-xs group-hover:before:duration-500 
                group-hover:after:duration-500 after:duration-500 hover:purple-red-500 
                hover:before:[box-shadow:_10px_10px_10px_15px_#ff9671] duration-500 before:duration-500 
                hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 
                hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  
                origin-left hover:decoration-2 hover:text-gray-50 relative bg-gray-900 h-10 w-30 border text-left p-3
                 text-gray-50  font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content['']
                  before:right-1 before:top-1 before:z-10 before:bg-pink-400 before:rounded-full before:blur-lg  after:absolute
                   after:z-10 after:w-20 after:h-20 after:content['']  after:bg-purple-500 after:right-8 after:top-3 after:rounded-full 
                   after:blur-lg"
              >
                Actualizar
              </button>
            </div>
            <div className="mt-1 flex space-x-2">
              {user.isBanned ? (
                <ActiveButton userId={user.userId} onUpdate={onUpdate} />
              ) : (
                <SuspendButton userId={user.userId} onUpdate={onUpdate} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoUsersAdmin;
