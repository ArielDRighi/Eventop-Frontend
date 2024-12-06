"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/userContext";
import { IUserProfile, IUserEdit } from "@/interfaces/IUser";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { updateUserImage, updateUserProfile } from "@/helpers/users.helpers";
import {
  EditIcon,
  Save,
  LogOut,
  X,
  Camera,
  Globe,
  DollarSign,
  Mail,
} from "lucide-react";
import HandlePassword from "@/components/HandlePassword";

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
  const [isEditing, setIsEditing] = useState(false);
  const token = JSON.parse(Cookies.get("accessToken") || "null");
  const { userId } = useUserContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserProfile>();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitImage = async () => {
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

  useEffect(() => {
    if (user) {
      Object.entries(user).forEach(([key, value]) =>
        setValue(key as keyof IUserProfile, value)
      );
      setUserData(user);
      setImagePreview(user.imageUrl || null);
      setLoading(false);
    } else {
      setError(true);
    }
  }, [user, setValue]);

  const onSubmit = async (data: IUserProfile) => {
    const dataToSend: IUserEdit = {
      name: data.name,
      email: data.email,
      preferredLanguage: data.preferredLanguage || "",
      preferredCurrency: data.preferredCurrency || "",
      password: data.password || "",
    };
    try {
      const res = await updateUserProfile(
        token as string,
        userId as string,
        dataToSend
      );
      console.log("Perfil actualizado:", res);
      setIsEditing(false);
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="flex flex-col gap-4 items-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-400 text-xl font-semibold animate-pulse">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex w-full h-screen justify-center items-center bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg">
          <p className="text-xl font-semibold">
            Error al cargar los datos del usuario
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-12 animate-pulse">
          Información del Usuario
        </h2>

        <div className="bg-gray-900 rounded-3xl shadow-2xl overflow-hidden transform  ease-in-out">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 p-8 flex flex-col justify-start items-center bg-gradient-to-b from-gray-900 to-gray-900">
              <div className="relative group">
                <Image
                  className="h-48 w-48 rounded-full object-cover border-4 border-purple-500 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400"
                  src={
                    imagePreview ||
                    "https://i.pinimg.com/736x/e8/8a/79/e88a79160843adc5b5edbc8cb55f90e0.jpg"
                  }
                  alt="Imagen del usuario"
                  width={192}
                  height={192}
                />
                <button
                  onClick={openModal}
                  className="absolute bottom-0 right-0 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <Camera size={24} />
                </button>
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-50">
                {userData?.name}
              </h3>
              <p className="text-gray-400">{userData?.email}</p>
            </div>

            <div className="md:col-span-2 p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-whie-50"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        {...register("name", {
                          required: "El nombre es obligatorio",
                        })}
                        className="w-full p-3 bg-gray-900 border border-purple-500 rounded-md text-white  focus:ring-purple-600 focus:border-transparent transition-all duration-300 pl-10"
                        disabled={!isEditing}
                      />
                      <EditIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-red-400 text-sm">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-whie-50"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: "El email es obligatorio",
                        })}
                        className="w-full p-3 bg-gray-900 border border-purple-500 rounded-md text-white  focus:ring-purple-600 focus:border-transparent transition-all duration-300 pl-10"
                        disabled={!isEditing}
                      />
                      <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-400 text-sm">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="preferredLanguage"
                      className="block text-sm font-semibold text-whie-50"
                    >
                      Idioma Preferido
                    </label>
                    <div className="relative">
                      <input
                        id="preferredLanguage"
                        {...register("preferredLanguage")}
                        className="w-full p-3 bg-gray-900 border border-purple-500 rounded-md text-white  focus:ring-purple-600 focus:border-transparent transition-all duration-300 pl-10"
                        disabled={!isEditing}
                      />
                      <Globe
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="preferredCurrency"
                      className="block text-sm font-semibold text-gray-50"
                    >
                      Moneda Preferida
                    </label>
                    <div className="relative">
                      <input
                        id="preferredCurrency"
                        {...register("preferredCurrency")}
                        className="w-full p-3 bg-gray-900 border border-purple-500 rounded-md text-white  focus:ring-purple-600 focus:border-transparent transition-all duration-300 pl-10"
                        disabled={!isEditing}
                      />
                      <DollarSign
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
                        size={20}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-end gap-4 mt-8">
                  {isEditing ? (
                    <>
                      <button
                        type="submit"
                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-purple-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-purple-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                      >
                        <span className="relative z-20 flex items-center">
                          <Save size={20} className="mr-2" />
                          Guardar Cambios
                        </span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-300 hover:before:[box-shadow:_20px_20px_20px_30px_#4b5563] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-gray-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-gray-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                      >
                        <span className="relative z-20 flex items-center">
                          <X size={20} className="mr-2" />
                          Cancelar
                        </span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-blue-300 hover:before:[box-shadow:_20px_20px_20px_30px_#2563eb] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-blue-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-blue-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-blue-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                    >
                      <span className="relative z-20 flex items-center">
                        <EditIcon size={20} className="mr-2" />
                        Editar Perfil
                      </span>
                    </button>
                  )}
                  <button
                    onClick={handleLogOut}
                    className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-red-300 hover:before:[box-shadow:_20px_20px_20px_30px_#dc2626] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-red-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-red-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-red-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                  >
                    <span className="relative z-20 flex items-center">
                      <LogOut size={20} className="mr-2" />
                      Cerrar Sesión
                    </span>
                  </button>
                </div>
              </form>

              <div className="border-t border-purple-600 my-8"></div>
                {userData?.password ? (
                  <div className="bg-gradient-to-r from-gray-900 to-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Cambiar Contraseña
                </h3>
                <HandlePassword
                  password={userData?.password || ""}
                  id={String(userData?.userId)}
                  />
              </div>
                ) :
                <div className="bg-gradient-to-r from-gray-900 to-gray-900 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-50 mb-4">
                  Crear Contraseña
                </h3>
                <HandleCreatePassword
                  password={userData?.password || ""}
                  id={String(userData?.userId)}
                  />
              </div>
                 )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 transition-opacity duration-300">
          <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md transform transition-all duration-300 scale-100 opacity-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-50">
                Cambiar Imagen
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 rounded-full p-1"
              >
                <X
                  size={24}
                  className="text-purple-500 hover:text-purple-600"
                />
              </button>
            </div>
            <div className="mb-6">
              <label
                htmlFor="imageUpload"
                className="block w-full p-4 text-center border-2 border-dashed border-purple-500 rounded-lg cursor-pointer hover:border-purple-500 transition-all duration-300"
              >
                <Camera size={48} className="mx-auto mb-2  text-purple-500 " />
                <span className="text-purple-400 font-mono">
                  Seleccionar imagen
                </span>
                <input
                  id="imageUpload"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            {imagePreview && (
              <div className="mb-6">
                <Image
                  src={imagePreview}
                  alt="Vista previa de la imagen"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto"
                />
              </div>
            )}
            <div className="flex flex-row justify-end gap-4">
              <button
                onClick={handleSubmitImage}
                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-purple-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-purple-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
              >
                <span className="relative z-20 flex items-center">
                  <Save size={20} className="mr-2" />
                  Guardar
                </span>
              </button>
              <button
                onClick={closeModal}
                className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-gray-300 hover:before:[box-shadow:_20px_20px_20px_30px_#4b5563] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4 origin-left hover:decoration-2 hover:text-gray-300 relative bg-gray-900 h-16 w-64 border text-left p-3 text-gray-50 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-gray-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-gray-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
              >
                <span className="relative z-20 flex items-center">
                  <X size={20} className="mr-2" />
                  Cancelar
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserInfo;
