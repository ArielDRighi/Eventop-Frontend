import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  changeUserPassword,
  createUserPassword,
} from "@/helpers/users.helpers";
import { Eye, EyeClosed } from "lucide-react";
import Swal from "sweetalert2";

interface HandlePasswordProps {
  password: string;
  id: string;
}

const HandlePassword: React.FC<HandlePasswordProps> = ({ password, id }) => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
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

  const handleSubmitPasswordChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const dataPassword = {
      oldPassword,
      newPassword,
    };
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log("Datos enviados:", dataPassword);
    try {
      const res = await changeUserPassword(token, id, dataPassword);
      if (res.statusCode === 401) {
        throw new Error("Contraseña incorrecta");
      }
      Swal.fire({
        icon: "success",
        title: "Contraseña cambiada",
        text: "La contraseña ha sido cambiada correctamente.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#6B46C1",
      });
      console.log("Contraseña cambiada:", res);
      setError(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cambiar la contraseña. Por favor, inténtelo de nuevo.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#6B46C1",
      });
      console.log("Error al cambiar la contraseña:", error);
      setError(
        "Error al cambiar la contraseña. Por favor, inténtelo de nuevo."
      );
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
    <div className="bg-gray-900 p-6 rounded-lg shadow-md">
      {password === "" ? (
        <form onSubmit={handleCreatePassword} className="space-y-4">
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-sm font-semibold text-gray-200"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 p-2 border w-full rounded-md bg-gray-900 text-white"
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
            <label
              htmlFor="oldPassword"
              className="block text-sm font-semibold text-gray-200"
            >
              Contraseña Actual
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="mt-1 p-2 border-purple-500 w-full rounded-md bg-gray-900 text-white"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeClosed className="text-purple-500" />
                ) : (
                  <Eye className="text-purple-500" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-50"
            >
              Nueva Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="mt-1 p-2 border-purple-500 w-full rounded-md bg-gray-900 text-white"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeClosed className="text-purple-500" />
                ) : (
                  <Eye className="text-purple-500" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-500 hover:before:[box-shadow:_20px_20px_20px_30px_#b39cd0] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-white relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-purple-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-purple-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
          >
            Cambiar Contraseña
          </button>
        </form>
      )}
    </div>
  );
};

export default HandlePassword;
