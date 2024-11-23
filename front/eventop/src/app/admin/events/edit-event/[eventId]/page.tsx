"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import { useEventById } from "@/helpers/events.helper";
import { useParams } from "next/navigation";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton";
import Cookies from "js-cookie";
import { useEditEvent } from "@/helpers/events.helper";

interface IFormInput {
  name: string;
  description: string;
  date: string;
  price: number;
  location_id: number;
  category_id: number;
}

export default function EditEvent() {
  const params = useParams();
  const eventId = params.eventId as string;
  const { event, loading, error } = useEventById(eventId);
  const { result: locations, loading: loadingLocations } = useGetAllLocations();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (event) {
      setValue("name", event.name);
      setValue("description", event.description);
      setValue("date", event.date);
      setValue("price", event.price);
      setValue("location_id", event.location_id.locationId);
      setValue("category_id", event.category_id.categoryId);
    }
  }, [event, setValue]);
  
  // const confirmDelete = () => {
  //   Swal.fire({
  //     title: "¿Estás seguro?",
  //     text: "No podrás revertir esta acción",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Sí, eliminar",
  //     cancelButtonText: "Cancelar",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       handleDelete(eventId);
  //     }
  //   });
  // };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = JSON.parse(Cookies.get("adminToken") || "null");
    console.log(data);
    try {
      const res = await useEditEvent(eventId, data, token);
      console.log(res);
    } catch (error) {
      console.error("Error actualizando el evento:", error);
    }
    // Aquí agregarás la lógica para hacer la petición de actualización
  };

  if (loading || loadingLocations) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Cargando...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Error al cargar el evento: {error}
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
    <section className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <h2 className="text-3xl font-bold text-slate-200 text-center mb-2">
        Editar Evento
      </h2>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Image
              className="h-full w-full object-contain"
              src={event.imageUrl || "https://via.placeholder.com/192"}
              alt="Imagen del evento"
              width={192}
              height={192}
            />
          </div>
          <div className="md:col-span-2 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    {...register("name", {
                      required: "El nombre es obligatorio",
                    })}
                    className="mt-1 p-2 border w-full rounded-md"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha
                  </label>
                  <input
                    id="date"
                    type="date"
                    {...register("date", {
                      required: "La fecha es obligatoria",
                    })}
                    className="mt-1 p-2 border w-full rounded-md"
                  />
                  {errors.date && (
                    <span className="text-red-500 text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "La descripción es obligatoria",
                    })}
                    className="mt-1 p-2 border w-full rounded-md"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">
                      {errors.description.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 p-2 border w-full rounded-md"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="location_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ubicación
                  </label>
                  {loadingLocations ? (
                    <p>Cargando ubicaciones...</p>
                  ) : (
                    <select
                      id="location_id"
                      {...register("location_id", {
                        required: "La ubicación es obligatoria",
                        valueAsNumber: true,
                      })}
                      className="mt-2 text-gray-900 p-3 border w-full rounded-md"
                    >
                      <option value="">Selecciona una ubicación</option>
                      {locations !== null &&
                        locations.map((location: ILocation) => (
                          <option
                            key={location.locationId}
                            value={location.locationId}
                          >
                            {location.city}, {location.state},{" "}
                            {location.country}
                          </option>
                        ))}
                    </select>
                  )}
                  {errors.location_id && (
                    <span className="text-red-500 text-sm">
                      {errors.location_id.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="category_id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Categoría
                  </label>
                  <select
                    id="category_id"
                    {...register("category_id", {
                      required: "La categoría es obligatoria",
                      valueAsNumber: true,
                    })}
                    className="mt-1 p-2 border w-full rounded-md"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value={1}>Música</option>
                    <option value={2}>Deportes</option>
                    <option value={3}>Tecnología</option>
                    <option value={4}>Arte</option>
                    <option value={5}>Gastronomía</option>
                    {/* Agrega más categorías según sea necesario */}
                  </select>
                  {errors.category_id && (
                    <span className="text-red-500 text-sm">
                      {errors.category_id.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center gap-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
                <DeleteButton eventId={event.eventId} />
          </div>
        </div>
      </div>
    </section>
  );
}
