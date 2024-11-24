import React from 'react';
import { IUser } from '@/interfaces/IUser';

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
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="0">
              {users.map((user) => (
                <tr key={user.userId}>
                  <td className="px-5 py-5 border-b border-gray-800  bg-gray-200 text-sm">
                    <p className="text-gray-800 whitespace-no-wrap">{user.name}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-800 bg-gray-200 text-sm">
                    <p className="text-gray-800 whitespace-no-wrap">{user.email}</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-800 bg-gray-200 text-sm">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        user.isBanned ? 'text-red-900' : 'text-green-900'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          user.isBanned ? 'bg-red-200' : 'bg-green-200'
                        }`}
                      ></span>
                      <span className="relative">
                        {user.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </span>
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

export default InfoUsersAdmin;