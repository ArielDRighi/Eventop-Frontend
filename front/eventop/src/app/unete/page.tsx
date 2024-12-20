"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import Swal from "sweetalert2";

const UnetePage: React.FC = () => {
  const router = useRouter();
  const { userName } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://eventop-backend.onrender.com/users/request-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar la solicitud");
      }
      const result = await response.json();
      console.log("Formulario enviado:", result.message);
      Swal.fire({
        title: "Éxito",
        text: "Formulario enviado correctamente",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/");
      });
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar el formulario",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRegisterRedirect = () => {
    router.push(`/register?redirect=unete`);
  };

  return (
    <div className="h-6xl bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <section className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          ¿Cómo funciona?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Organiza y gestiona tus eventos de manera sencilla
        </p>
        <div className="flex flex-row flex-wrap justify-around max-h-2xl max-w-6xl gap-8">
          {!userName && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-xs mx-auto border border-gray-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                Crea tu cuenta
              </h3>
              <p className="text-gray-400 text-md">
                Regístrate para comenzar a usar la plataforma
              </p>
              <button
                onClick={handleRegisterRedirect}
                className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300"
              >
                Regístrate
              </button>
            </div>
          )}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-xs mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              1. Solicita ser creador
            </h3>
            <p className="text-gray-400 text-md">
              Solicita permisos para crear eventos
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-xs mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              2. Crea tu evento
            </h3>
            <p className="text-gray-400 text-md">
              Configura los detalles de tu evento en minutos
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-xs mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              3. Personaliza tickets
            </h3>
            <p className="text-gray-400 text-md">
              Define tipos de entradas y precios a tu medida
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 max-w-xs mx-auto border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-2">
              4. ¡Publica!
            </h3>
            <p className="text-gray-400 text-md">
              Comparte y vende tickets al instante
            </p>
          </div>
        </div>
      </section>
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        Únete a Nosotros
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-6xl space-y-6"
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
              name="name"
              value={formData.name}
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
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full bg-gray-900 text-gray-50 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500
           hover:border-purple-600 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 
           hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left 
           hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-full border text-left p-4 text-purple-300
            text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1
             before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 
             after:h-20 after:content-[''] after:bg-purple-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
        >
          Solicita ser Creador
        </button>
      </form>
    </div>
  );
};

export default UnetePage;
