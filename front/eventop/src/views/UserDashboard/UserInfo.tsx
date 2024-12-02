"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/userContext";
import { IUserProfile } from "@/interfaces/IUser";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  updateUserImage,
  updateUserProfile,
  changeUserPassword,
} from "@/helpers/users.helpers";
import { EditIcon, Eye, EyeClosed } from "lucide-react";

interface UserInfoProps {
  user: IUserProfile | null;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const token = JSON.parse(Cookies.get("accessToken") || "null");
  const { userId } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserProfile>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
  } = useForm<{ oldPassword: string; newPassword: string }>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitImage = async () => {
    console.log("Imagen enviada:", newImage);
    console.log("Token:", token);
    console.log("Id:", userId);
    try {
      const res = await updateUserImage(
        token as string,
        userId as string,
        newImage
      );
      console.log(res);
    } catch (error) {
      console.log("Error al actualizar la imagen:", error);
    }

    closeModal();
  };

  const handleLogOut = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (user) {
      // Establece valores iniciales del formulario
      Object.entries(user).forEach(([key, value]) =>
        setValue(key as keyof IUserProfile, value)
      );
      setUserData(user);
      setImagePreview(user.imageUrl);
      setLoading(false);
    } else {
      setError(true);
    }
  }, [user, setValue]);

  const onSubmit = async (data: IUserProfile) => {
    const dataToSend = {
      name: data.name,
      email: data.email,
      preferredLanguage: data.preferredLanguage || "",
      preferredCurrency: data.preferredCurrency || "",
      password: data.password || "",
    };
    console.log("Datos enviados:", dataToSend);
    try {
      const res = await updateUserProfile(
        token as string,
        userId as string,
        dataToSend
      );
      console.log("Perfil actualizado:", res);
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
    }
  };

  const onSubmitPasswordChange = async (data: {
    oldPassword: string;
    newPassword: string;
  }) => {
     const dataPassword = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
     }
    console.log("Datos enviados:", dataPassword)
    try {
      const res = await changeUserPassword(token, user?.userId, dataPassword)
      console.log("Contraseña cambiada:", res);
    } catch (error) {
      console.log("Error al cambiar la contraseña:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar los datos del usuario</div>;
  }

  return (
    <section className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <h2 className="text-3xl font-bold text-purple-500 text-center mb-8">
        Información del Usuario
      </h2>

      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-2 flex flex-col justify-start items-center">
            <Image
              className="h-48 w-48 rounded-full object-cover"
              src={imagePreview || "/user-placeholder.webp"}
              alt="Imagen del usuario"
              width={192}
              height={192}
            />
            <button
              onClick={openModal}
              className="text-center mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              <EditIcon />
            </button>

            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <span
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <h2 className="text-xl font-bold mb-4 text-white">
                    Cambiar Imagen
                  </h2>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                  <button
                    onClick={handleSubmitImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition duration-300"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                  className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Idioma Preferido */}
              <div>
                <label
                  htmlFor="preferredLanguage"
                  className="block text-sm font-medium text-gray-300"
                >
                  Idioma Preferido
                </label>
                <input
                  id="preferredLanguage"
                  {...register("preferredLanguage")}
                  className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
                />
              </div>

              {/* Moneda Preferida */}
              <div>
                <label
                  htmlFor="preferredCurrency"
                  className="block text-sm font-medium text-gray-300"
                >
                  Moneda Preferida
                </label>
                <input
                  id="preferredCurrency"
                  {...register("preferredCurrency")}
                />
              </div>

              {/* Botones Guardar y Log Out */}
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Log Out
                </button>
              </div>
            </form>

            {/* Formulario para Cambiar la Contraseña */}
            <form
              onSubmit={handleSubmit(onSubmitPasswordChange)}
              className="space-y-6 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-300">
                Cambiar Contraseña
              </h3>
              <div className="relative">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Contraseña Actual
                </label>
                <input
                  id="oldPassword"
                  type={showPassword ? "text" : "password"}
                  {...register("oldPassword", {
                    required: "La contraseña actual es obligatoria",
                  })}
                  className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-300"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
                {errors.currentPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.oldPassword.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-300"
                >
                  Nueva Contraseña
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...register("newPassword", {
                    required: "La nueva contraseña es obligatoria",
                  })}
                  className="mt-1 p-2 border w-full rounded-md bg-gray-700 text-white"
                />
                {errors.newPassword && (
                  <span className="text-red-500 text-sm">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
