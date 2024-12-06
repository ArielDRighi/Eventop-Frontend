"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/userContext";

const UnetePage: React.FC = () => {
  const { userName } = useUserContext();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    descripcion: ""
  });

  useEffect(() => {
    if (userName?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: userName.email
      }));
    }
  }, [userName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log("Formulario enviado:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">¿Cómo funciona?</h2>
        <p className="text-lg text-gray-300 mb-8">Organiza y gestiona tus eventos de manera sencilla</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-2">1. Crea tu evento</h3>
            <p className="text-gray-300">Configura los detalles de tu evento en minutos</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-2">2. Personaliza tickets</h3>
            <p className="text-gray-300">Define tipos de entradas y precios a tu medida</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-white mb-2">3. ¡Publica!</h3>
            <p className="text-gray-300">Comparte y vende tickets al instante</p>
          </div>
        </div>
      </section>
      <h1 className="text-3xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">Únete a Nosotros</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="nombre" className="block text-lg font-semibold text-gray-300 mb-2">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 text-gray-50 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="email" className="block text-lg font-semibold text-gray-300 mb-2">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 text-gray-50 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-lg font-semibold text-gray-300 mb-2">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full bg-gray-900 text-gray-50 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default UnetePage;
