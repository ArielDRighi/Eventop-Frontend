"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IEventsCreate } from "@/interfaces/IEventos";
import { createEvent } from "@/helpers/events.helper";

interface IFormInput extends Omit<IEventsCreate, "date" | "image"> {
  date: string;
  image: File | string;
}

const EventForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [image, setImage] = useState<File | null>(null);

  // Función para manejar el envío del formulario
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = JSON.parse(localStorage.getItem('access_token') || 'null');
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }

    // Formatear los datos antes de enviarlos
    const formattedData: IEventsCreate = {
      ...data,
      date: new Date(data.date), // Convertir `date` a una instancia de `Date`
    };
 
    try {
      console.log(formattedData)
      console.log(image)
      const response = await createEvent(formattedData, token, image);
      console.log(response);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  // Función para manejar la subida de la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
    setImage(e.target.files[0]);
    }
  };

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="text-gray-900 mt-11space-y-4 p-4 border rounded-lg shadow-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-slate-200">Crear Evento</h1>

      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-200">Nombre</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "El nombre es obligatorio" })}
          className="mt-1 text-gray-900 p-2 border w-full rounded-md"
          placeholder="nombre"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-200">Descripción</label>
        <textarea
          id="description"
          {...register("description", { required: "La descripción es obligatoria" })}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="description"
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>

      {/* Fecha */}
      <div>
        <label htmlFor="date" className="block text-sm font-semibold text-slate-200">Fecha</label>
        <input
          id="date"
          type="date"
          {...register("date", { required: "La fecha es obligatoria" })}
          className="mt-1 p-2 border w-full rounded-md"
          
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
      </div>

      {/* Precio */}
      <div>
        <label htmlFor="price" className="block text-sm font-semibold text-slate-200">Precio</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="price"
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="category_id" className="block text-sm font-semibold text-slate-200">Categoría</label>
        <input
          id="category_id"
          type="number"
          {...register("category_id", { required: "La categoría es obligatoria", valueAsNumber: true })}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="categoria"
        />
        {errors.category_id && <span className="text-red-500 text-sm">{errors.category_id.message}</span>}
      </div>

      {/* Ubicación */}
      <div>
        <label htmlFor="location_id" className="block text-sm font-semibold text-slate-200">Ubicación</label>
        <input
          id="location_id"
          type="number"
          {...register("location_id", { required: "La ubicación es obligatoria", valueAsNumber: true })}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="ubicacion"
        />
        {errors.location_id && <span className="text-red-500 text-sm">{errors.location_id.message}</span>}
      </div>

      {/* Moneda */}
      <div>
        <label htmlFor="currency" className="block text-sm font-semibold text-slate-200">Moneda</label>
        <input
          id="currency"
          type="text"
          {...register("currency", { required: "La moneda es obligatoria" })}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="moneda"
        />
        {errors.currency && <span className="text-red-500 text-sm">{errors.currency.message}</span>}
      </div>

      {/* Imagen */}
      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-slate-200">Imagen</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="mt-1 p-2 w-full rounded-md"
        />
        {image && <p className="text-sm text-slate-400">Imagen cargada: {image.name}</p>}
      </div>

      <button type="submit" className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md">Crear Evento</button>
    </form>
  );
};

export default EventForm;
