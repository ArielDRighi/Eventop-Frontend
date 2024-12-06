"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/userContext";

const UnetePage: React.FC = () => {
  const { userName } = useUserContext();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    descripcion: "",
  });

  useEffect(() => {
    if (userName) {
      setFormData((prevData) => ({
        ...prevData,
        email: userName,
      }));
    }
  }, [userName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a un servidor
    console.log("Formulario enviado:", formData);
  };

  return (
    <div
      className=" h-6xl w-full
     bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-evenly"
    >
      <section className="text-center mb-12 bg-gray-900">
        <h2 className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          ¿Cómo funciona?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Organiza y gestiona tus eventos de manera sencilla
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              1. Crea tu evento
            </h3>
            <p className="text-gray-400 text-md">
              Configura los detalles de tu evento en minutos
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              2. Personaliza tickets
            </h3>
            <p className="text-gray-400 text-md">
              Define tipos de entradas y precios a tu medida
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              3. ¡Publica!
            </h3>
            <p className="text-gray-400 text-md">
              Comparte y vende tickets al instante
            </p>
          </div>
        </div>
      </section>

     
      <h1 className="text-3xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        Únete a Nosotros
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label
              htmlFor="nombre"
              className="block text-lg font-semibold text-gray-300 mb-2"
            >
              Nombre:
            </label>
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
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-300 mb-2"
            >
              Email:
            </label>
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
          <label
            htmlFor="descripcion"
            className="block text-lg font-semibold text-gray-300 mb-2"
          >
            Descripción:
          </label>
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
          className="group group-hover:before:duration-500 
            group-hover:after:duration-500 after:duration-500
             hover:border-purple-600 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] 
             duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 
             hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-purple-300 r
             relative bg-gray-900 h-16 w-full border text-left p-4 text-purple-300 text-base font-bold rounded-lg 
             overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 
             before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 
             after:h-20 after:content-[''] after:bg-purple-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
        >
          Unete
        </button>
      </form>
    
    </div>
  );
};

export default UnetePage;
