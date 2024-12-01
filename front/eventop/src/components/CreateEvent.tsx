"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IEventsCreate } from "@/interfaces/IEventos";
import { createEvent } from "@/helpers/events.helper";
import Cookies from "js-cookie";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import { useRouter } from "next/navigation";
interface IFormInput extends Omit<IEventsCreate, "date" | "image"> {
  date: string;
  quantityAvailable: number;
}



const EventForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();
  const [image, setImage] = useState<File | null>(null);

  // Llamar a la función useGetAllLocations y desestructurar el resultado
  const { result: locations, loading } = useGetAllLocations();
  const router = useRouter();
  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = JSON.parse(Cookies.get("adminToken") || "null");
    console.log(token);
    if (!token) {
      throw new Error(
        "No autorizado. El token de autenticación no está presente."
      );
    }

    // Formatear los datos antes de enviarlos
    const formattedData: IEventsCreate = {
      ...data,
      date: new Date(data.date), // Convertir `date` a una instancia de `Date`
      image: image ? image : "", // Incluir la propiedad `image`
    };

    try {
      console.log(formattedData);
      console.log(image);
      const response = await createEvent(formattedData, token, image);
      console.log(response);
      // Limpiar el formulario después de enviar los datos
      reset();
      setImage(null);
      router.push("/admin/events");
    } catch (error) {
      console.error("Error creando el evento:", error);
    }
  };

  // Función para manejar la subida de la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div>
  <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
    Crear Evento
  </h1>

    <form
  onSubmit={handleSubmit(onSubmit)}
  className="bg-gradient-to-br from-gray-900 to-gray-900 text-gray-100 mt-8 space-y-8 p-8 border border-gray-900 rounded-xl shadow-2xl max-w-4xl mx-auto"
>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Nombre */}
    <div className="col-span-1">
      <label
        htmlFor="name"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Nombre
      </label>
      <input
        id="name"
        type="text"
        {...register("name", { required: "El nombre es obligatorio" })}
        className="input h-[52px] text-[15px] text-gray-50 w-full bg-gray-900  px-3 py-1 rounded-lg  border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500  transition-all duration-150 ease-in-out"
        placeholder="Nombre del evento"
      />
      {errors.name && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.name.message}
        </span>
      )}
    </div>

    {/* Fecha */}
    <div className="col-span-1">
      <label
        htmlFor="date"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Fecha
      </label>
      <input
        id="date"
        type="date"
        {...register("date", { required: "La fecha es obligatoria" })}
        className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500   transition-all duration-150 ease-in-out"
      />
      {errors.date && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.date.message}
        </span>
      )}
    </div>

    {/* Descripción */}
    <div className="col-span-1 md:col-span-2">
      <label
        htmlFor="description"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Descripción
      </label>
      <textarea
        id="description"
        {...register("description", {
          required: "La descripción es obligatoria",
        })}
        className="input h-[68px] text-[15px] text-white/60 w-full bg-gray-900  text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500   transition-all duration-150 ease-in-out"
        placeholder="Descripción del evento"
        rows={4}
      />
      {errors.description && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.description.message}
        </span>
      )}
    </div>

    {/* Precio */}
    <div className="col-span-1">
      <label
        htmlFor="price"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Precio
      </label>
      <input
        id="price"
        type="number"
        step="0.01"
        {...register("price", {
          required: "El precio es obligatorio",
          valueAsNumber: true,
        })}
        className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500   transition-all duration-150 ease-in-out"
        placeholder="Precio del evento"
      />
      {errors.price && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.price.message}
        </span>
      )}
    </div>

    {/* Moneda */}
    <div className="col-span-1">
      <label
        htmlFor="currency"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Moneda
      </label>
      <input
        id="currency"
        type="text"
        {...register("currency", { required: "La moneda es obligatoria" })}
        className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500  transition-all duration-150 ease-in-out"
        placeholder="Moneda"
      />
      {errors.currency && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.currency.message}
        </span>
      )}
    </div>

    {/* Cantidad de Tickets */}
    <div className="col-span-1">
      <label
        htmlFor="tickets"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Cantidad de Tickets
      </label>
      <input
        id="tickets"
        type="number"
        {...register("quantityAvailable", {
          required: "La cantidad de tickets es obligatoria",
          valueAsNumber: true,
        })}
        className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500  transition-all duration-150 ease-in-out"
        placeholder="Cantidad de tickets disponibles"
      />
      {errors.quantityAvailable && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.quantityAvailable.message}
        </span>
      )}
    </div>

    {/* Categoría */}
    <div className="col-span-1">
      <label
        htmlFor="category_id"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Categoría
      </label>
      <select
        id="category_id"
        {...register("category_id", {
          required: "La categoría es obligatoria",
          valueAsNumber: true,
        })}
        className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-[#f4f4f5] px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500  transition-all duration-150 ease-in-out"
      >
        <option value="">Selecciona una categoría</option>
        <option value={1}>Música</option>
        <option value={2}>Deportes</option>
        <option value={3}>Tecnología</option>
        <option value={4}>Arte</option>
        <option value={5}>Gastronomía</option>
      </select>
      {errors.category_id && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.category_id.message}
        </span>
      )}
    </div>

    {/* Ubicación */}
    <div className="col-span-1">
      <label
        htmlFor="location_id"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Ubicación
      </label>
      {loading ? (
        <p className="text-gray-400 italic">Cargando ubicaciones...</p>
      ) : (
        <select
          id="location_id"
          {...register("location_id", {
            required: "La ubicación es obligatoria",
            valueAsNumber: true,
          })}
          className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500  transition-all duration-150 ease-in-out"
        >
          <option value="">Selecciona una ubicación</option>
          {locations !== null &&
            locations.map((location: ILocation) => (
              <option key={location.locationId} value={location.locationId}>
                {location.city}, {location.state}, {location.country}
              </option>
            ))}
        </select>
      )}
      {errors.location_id && (
        <span className="text-red-400 text-sm mt-1 block">
          {errors.location_id.message}
        </span>
      )}
    </div>

    {/* Imagen */}
    <div className="col-span-1 md:col-span-2">
      <label
        htmlFor="restaurantImage"
        className="block text-lg font-semibold text-gray-300 mb-2"
      >
        Imagen
      </label>
      <div className="relative grid grid-cols-1 md:grid-cols-3 border-gray-700 bg-gray-900 rounded-xl">
        <div className="rounded-l-xl p-4 bg-gray-900 flex flex-col justify-center items-center border-0">
          <label
            className="cursor-pointer hover:bg-purple-600 inline-flex items-center shadow-md my-2 px-4 py-2 bg-purple-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest active:bg-purple-600 focus:outline-none focus:border-purple-500 focus:ring ring-purple-300 disabled:opacity-25 transition ease-in-out duration-150"
            htmlFor="restaurantImage"
          >
            Seleccionar Imagen
            <input
              id="restaurantImage"
              className="text-sm cursor-pointer w-36 hidden"
              type="file"
              onChange={handleImageChange}
              accept="image/png, image/jpeg, image/webp, image/gif"
            />
          </label>
        </div>
        <div
          className={`relative h-32 flex justify-center items-center border-2 border-dashed border-purple-500 rounded-lg bg-gray-900 col-span-2 m-2 ${
            image ? "bg-cover bg-center" : ""
          }`}
          style={{
            backgroundImage: image
              ? `url(${URL.createObjectURL(image)})`
              : "",
          }}
        >
          {!image && (
            <span className="text-purple-500 opacity-90">
              <svg
                className="w-14 h-14"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.7"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </span>
          )}
        </div>
      </div>
      {image && (
        <p className="text-sm text-gray-300 font-mono mt-4">
          Imagen cargada<span className="text-purple-500 text-sm">: </span>
          {image.name}
        </p>
      )}
    </div>
  </div>

  <button
    type="submit"
    className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-600 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-64 border text-left p-4 text-purple-300 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-purple-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
  >
    Crear Evento
  </button>
</form>
    </div>
  );
};

export default EventForm;
