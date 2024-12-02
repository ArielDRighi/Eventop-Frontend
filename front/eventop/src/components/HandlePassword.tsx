import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { changeUserPassword, createUserPassword } from '@/helpers/users.helpers';
import { Eye, EyeClosed } from 'lucide-react';

interface HandlePasswordProps {
  password: string;
  id: string;
}

const HandlePassword: React.FC<HandlePasswordProps> = ({ password, id }) => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitPasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataPassword = {
      oldPassword,
      newPassword,
    };
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log("Datos enviados:", dataPassword);
    try {
      const res = await changeUserPassword(token, id, dataPassword);
      console.log("Contraseña cambiada:", res);
      setError(null);
    } catch (error) {
      console.log("Error al cambiar la contraseña:", error);
      setError("Error al cambiar la contraseña. Por favor, inténtelo de nuevo.");
    }
  };

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataPassword = {
      password: newPassword,
      confirmPassword: newPassword,
    };
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log("Datos enviados:", dataPassword);
    try {
      const res = await createUserPassword(token, id, dataPassword);
      console.log("Contraseña creada:", res);
      setError(null);
    } catch (error) {
      console.log("Error al crear la contraseña:", error);
      setError("Error al crear la contraseña. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      {password === "" ? (
        <form onSubmit={handleCreatePassword} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              Nueva Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Crear Contraseña
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitPasswordChange} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300">
              Contraseña Actual:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              Nueva Contraseña:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Cambiar Contraseña
          </button>
        </form>
      )}
    </div>
  );
};

export default HandlePassword;