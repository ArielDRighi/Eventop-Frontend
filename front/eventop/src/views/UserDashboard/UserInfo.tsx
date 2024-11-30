"use client";

import { UserProfile, useUser, logout } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

export const UserInfo = () => {
  const { error, isLoading, user } = useUser();
  
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Usuario",
    email: "usuario@ejemplo.com",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert(`Datos guardados:\nNombre: ${formData.name}\nEmail: ${formData.email}`);
    setIsEditing(false);
  };


  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-center space-x-2">
          
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        </div>
        <div className="flex flex-col gap-4 w-1/4 mx-auto">
          {/* Placeholder for a loading state */}
          <img src="#" alt="Loading" />
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <div className={`flex flex-col items-center w-full max-w-2xl mx-auto p-6`}>
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        {userData && (
          <div className="p-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={userData.picture || 'https://i.pinimg.com/736x/05/f9/fa/05f9fa8e055a33e9e59ca51bca27e401.jpg'}
                  alt={userData.name ? `${userData.name}'s picture` : 'Usuario'}
                  loading="lazy"
                  className="rounded-full shadow-md"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-2xl font-semibold text-gray-800">
                  ¡Hola, {userData.nickname || 'Usuario'}!
                </h1>
                <p className="text-sm text-gray-600">
                  {userData.email || 'No disponible'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="px-6 py-3 bg-gray-50 flex flex-col justify-between items-center space-y-2">
          {/* Botón para abrir el formulario */}
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Configurar perfil
          </button>

          {/* Modal de edición */}
          {isEditing && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Editar perfil</h2>
                <form className="flex flex-col gap-4">
                  {/* Campo de nombre */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  {/* Campo de correo */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  {/* Botones de acción */}
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        
        {/* Botón de Logout */}
        <div className="px-6 py-3">
          <a
             href='/api/auth/logout'
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar sesión
          </a>
        </div>
      </div>
    </div>
  );
};
