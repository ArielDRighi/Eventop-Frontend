"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import { useEventById } from "@/helpers/events.helper";
import { useParams } from "next/navigation";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton";
import EditEventImage from "@/components/EditEventImage";
import ApproveButton from "@/components/ApproveButton";
import Cookies from "js-cookie";
import { editEvent } from "@/helpers/events.helper";
import { useRouter } from "next/navigation";
interface IFormInput {
  name: string;
  description: string;
  date: string;
  price: number;
  location_id: number;
  category_id: number;
  currency: string;
  image: string;
  quantityAvailable: number;
}

const EditEventPage = () => {
  const params = useParams();
  const eventId = parseInt(params.eventId as string, 10);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { event, loading, error } = useEventById(eventId);
  const { result: locations, loading: loadingLocations } = useGetAllLocations();
  const router = useRouter();
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
      setValue("price", Number(event.price));
      setValue("location_id", event.location_id.locationId);
      setValue("category_id", event.category_id.categoryId);
    }
    setImagePreview(event?.imageUrl || null);
  }, [event, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log(data);
    try {
      const res = await editEvent(eventId, data, token);
      if (res) {
        router.push("/admin/events");
      }
      console.log(res);
    } catch (error) {
      console.error("Error actualizando el evento:", error);
    }
    // Aquí agregarás la lógica para hacer la petición de actualización
  };

  if (loading || loadingLocations) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
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
    <section className="mt-10 min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <h2 className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
        Editar Evento
      </h2>
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-8">
            <div className="relative group text-center">
              <Image
                className="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                src={
                  imagePreview ||
                  "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"
                }
                alt={event.name}
                width={500}
                height={500}
              />
              <EditEventImage
                changeImage={setImagePreview}
                id={event.eventId}
              />
            </div>
          </div>
          <div className="md:col-span-2 p-8 bg-gray-900 rounded-r-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-lg font-semibold text-gray-50 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    {...register("name", {
                      required: "El nombre es obligatorio",
                    })}
                    className="input h-[52px] text-[15px] text-gray-50 w-full bg-gray-900 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
                  />
                  {errors.name && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.name.message}
                    </span>
                  )}
                </div>

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
                    {...register("date", {
                      required: "La fecha es obligatoria",
                    })}
                    className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
                  />
                  {errors.date && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1 lg:col-span-2">
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
                    className="input h-[68px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
                    rows={4}
                  />
                  {errors.description && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.description.message}
                    </span>
                  )}
                </div>

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
                    className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
                  />
                  {errors.price && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.price.message}
                    </span>
                  )}
                </div>

                <div className="col-span-1">
                  <label
                    htmlFor="location_id"
                    className="block text-lg font-semibold text-gray-300 mb-2"
                  >
                    Ubicación
                  </label>
                  {loadingLocations ? (
                    <p className="text-gray-400 italic">
                      Cargando ubicaciones...
                    </p>
                  ) : (
                    <select
                      id="location_id"
                      {...register("location_id", {
                        required: "La ubicación es obligatoria",
                        valueAsNumber: true,
                      })}
                      className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
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
                    <span className="text-red-400 text-sm mt-1 block">
                      {errors.location_id.message}
                    </span>
                  )}
                </div>

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
                    className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
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
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button
                  type="submit"
                  name="action"
                  value="save"
                  className="group hover:before:duration-500 hover:after:duration-500 after:duration-500 hover:border-purple-600 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-white-50 relative bg-gray-900 h-16 w-full sm:w-38 border text-center p-3 text-white text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-purple-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                    <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M14 4l0 4l-6 0l0 -4" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="flex gap-4 w-full sm:w-auto justify-center mt-4">
              <DeleteButton eventId={event.eventId} />
              <ApproveButton eventId={event.eventId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEventPage;
