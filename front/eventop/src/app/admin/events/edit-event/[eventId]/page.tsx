"use client";

import { useEffect } from "react";
import DeleteButton from "@/components/DeleteButton";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEventById } from "@/helpers/events.helper";

interface IFormInput {
  name: string;
  description: string;
  date: string;
  price: number;
  location: string;
  category: string;
}



export default function EditEvent() {
  const params = useParams();
  const eventId = params.eventId as string;
  const { event, loading, error } = useEventById(eventId);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>();

  useEffect(() => {
    if (event) {
      setValue("name", event.name);
      setValue("description", event.description);
      setValue("date", event.date);
      setValue("price", event.price);
      setValue("location", event.location_id.city);
      setValue("category", event.category_id.name);
    }
  }, [event, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data);
    // Aquí agregarás la lógica para hacer la petición de actualización
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Evento no encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src={event.imageUrl || "https://via.placeholder.com/192"}
              alt="Imagen del evento"
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  id="name"
                  {...register("name", { required: "El nombre es obligatorio" })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  id="description"
                  {...register("description", { required: "La descripción es obligatoria" })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  id="date"
                  type="date"
                  {...register("date", { required: "La fecha es obligatoria" })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { required: "El precio es obligatorio", valueAsNumber: true })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                <input
                  id="location"
                  {...register("location", { required: "La ubicación es obligatoria" })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                <input
                  id="category"
                  {...register("category", { required: "La categoría es obligatoria" })}
                  className="mt-1 p-2 border w-full rounded-md"
                />
                {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Guardar Cambios
                </button>
                <DeleteButton eventId={event.eventId} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}