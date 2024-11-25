"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IEventsCreate } from "@/interfaces/IEventos";
import { createEvent } from "@/helpers/events.helper";
import Cookies from "js-cookie";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";

interface IFormInput extends Omit<IEventsCreate, "date" | "image"> {
  date: string;
  quantityAvailable: number;
}

const EventForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const [image, setImage] = useState<File | null>(null);

  // Llamar a la función useGetAllLocations y desestructurar el resultado
  const { result: locations, loading } = useGetAllLocations();

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = JSON.parse(Cookies.get("adminToken") || 'null');
    console.log(token)
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }

    // Formatear los datos antes de enviarlos
    const formattedData: IEventsCreate = {
      ...data,
      date: new Date(data.date), // Convertir `date` a una instancia de `Date`
      image: image ? image : '', // Incluir la propiedad `image`
    };

    try {
      console.log(formattedData)
      console.log(image)
      const response = await createEvent(formattedData, token, image);
      console.log(response);
      // Limpiar el formulario después de enviar los datos
      reset();
      setImage(null);
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
    <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900 mt-5 space-y-6 p-6 border rounded-lg shadow-lg max-w-6xl mx-auto bg-gray-800 lg:max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-200 text-center">Crear Evento</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="col-span-1">
          <label htmlFor="name" className="block text-lg font-semibold text-slate-200">Nombre</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            placeholder="Nombre del evento"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        {/* Fecha */}
        <div className="col-span-1">
          <label htmlFor="date" className="block text-lg font-semibold text-slate-200">Fecha</label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "La fecha es obligatoria" })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
        </div>

        {/* Descripción */}
        <div className="col-span-1 lg:col-span-2">
          <label htmlFor="description" className="block text-lg font-semibold text-slate-200">Descripción</label>
          <textarea
            id="description"
            {...register("description", { required: "La descripción es obligatoria" })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            placeholder="Descripción del evento"
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        {/* Precio */}
        <div className="col-span-1">
          <label htmlFor="price" className="block text-lg font-semibold text-slate-200">Precio</label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            placeholder="Precio del evento"
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
        </div>

        
        {/* Moneda */}
        <div className="col-span-1">
          <label htmlFor="currency" className="block text-lg font-semibold text-slate-200">Moneda</label>
          <input
            id="currency"
            type="text"
            {...register("currency", { required: "La moneda es obligatoria" })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            placeholder="Moneda"
          />
          {errors.currency && <span className="text-red-500 text-sm">{errors.currency.message}</span>}
        </div>

        {/* Cantidad de Tickets */}
        <div className="col-span-1">
          <label htmlFor="tickets" className="block text-lg font-semibold text-slate-200">Cantidad de Tickets</label>
          <input
            id="tickets"
            type="number"
            {...register("quantityAvailable", { required: "La cantidad de tickets es obligatoria", valueAsNumber: true })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            placeholder="Cantidad de tickets disponibles"
          />
          {errors.quantityAvailable && <span className="text-red-500 text-sm">{errors.quantityAvailable.message}</span>}
        </div>

        {/* Categoría */}
        <div className="col-span-1">
          <label htmlFor="category_id" className="block text-lg font-semibold text-slate-200">Categoría</label>
          <select
            id="category_id"
            {...register("category_id", { required: "La categoría es obligatoria", valueAsNumber: true })}
            className="mt-2 text-gray-900 p-3 border w-full rounded-md"
          >
            <option value="">Selecciona una categoría</option>
            <option value={1}>Música</option>
            <option value={2}>Deportes</option>
            <option value={3}>Tecnología</option>
            <option value={4}>Arte</option>
            <option value={5}>Gastronomía</option>
            {/* Agrega más categorías según sea necesario */}
          </select>
          {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id.message}</span>}
        </div>

        {/* Ubicación */}
        <div className="col-span-1">
          <label htmlFor="location_id" className="block text-lg font-semibold text-slate-200">Ubicación</label>
          {loading ? (
            <p>Cargando ubicaciones...</p>
          ) : (
            <select
              id="location_id"
              {...register("location_id", { required: "La ubicación es obligatoria", valueAsNumber: true })}
              className="mt-2 text-gray-900 p-3 border w-full rounded-md"
            >
              <option value="">Selecciona una ubicación</option>
              {locations !== null && locations.map((location: ILocation) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.city}, {location.state}, {location.country}
                </option>
              ))}
            </select>
          )}
          {errors.location_id && <span className="text-red-500 text-sm">{errors.location_id.message}</span>}
        </div>


        {/* Imagen */}
        <div className="col-span-1">
          <label htmlFor="image" className="block text-lg font-semibold text-slate-200">Imagen</label>
          <input
            id="image"
            type="file"
            onChange={handleImageChange}
            className="mt-2 text-gray-900 p-3 w-full rounded-md"
          />
          {image && <p className="text-sm text-slate-400">Imagen cargada: {image.name}</p>}
        </div>
      </div>

      <button type="submit" className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-md w-full">Crear Evento</button>
    </form>
  );
};

export default EventForm;
