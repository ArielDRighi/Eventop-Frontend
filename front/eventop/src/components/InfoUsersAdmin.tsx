import React from "react";
import { IUser } from "@/interfaces/IUser";
import SuspendButton from "./SuspendButton";
import ActiveButton from "./ActiveButton";
import Image from "next/image";

interface InfoUsersAdminProps {
  userData: IUser[];
}

const InfoUsersAdmin: React.FC<InfoUsersAdminProps> = ({ userData }) => {
 
  const users = userData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {users.map((user) => (
        <div key={user.userId} className="bg-gray-800 p-4 rounded-lg shadow mx-auto w-[200px]">
          <div className="flex flex-col items-center">
            <Image
              src={user.imageUrl || "/user-placeholder.webp"}
              alt={user.name}
              width={100}
              height={100}
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
              {user.isBanned ? (
                <ActiveButton userId={user.userId} />
              ) : (
                <SuspendButton userId={user.userId} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoUsersAdmin;
