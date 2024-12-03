"use client";

import { useGetAllCategories } from "@/helpers/categories.helpers";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ICategory } from "@/interfaces/ICategory";
import { IEvents } from "@/interfaces/IEventos";
import { ILocation } from "@/interfaces/ILocations";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, DollarSign, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { getNearbyEvents } from "@/helpers/events.helper";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const EncontraEventos = () => {
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [events, setEvents] = useState<IEvents[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvents[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [radius, setRadius] = useState<number>(10);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getEvents = async () => {
    try {
      const response = await fetch(`${APIURL}/events`);
      if (!response.ok) {
        throw new Error("Error fetching events");
      }
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((evento: IEvents) => {
      const matchesCategory =
        selectedCategory === "" || (evento.category_id && evento.category_id.categoryId === parseInt(selectedCategory));
      const matchesLocation =
        selectedLocation === "" || (evento.location_id && evento.location_id.locationId === parseInt(selectedLocation));
      const matchesSearch = searchTerm === "" || evento.name.toLowerCase().includes(searchTerm.toLowerCase());

      const price = evento.price;
      const priceFilterNumber = priceFilter === "0" ? 0 : parseInt(priceFilter);

      const matchesPrice =
        priceFilter === "" ||
        (priceFilter === "0" && price == 0) ||
        (priceFilter !== "0" && price > 0 && price <= priceFilterNumber);

      return matchesCategory && matchesLocation && matchesSearch && matchesPrice;
    });

    setFilteredEvents(filtered);
  }, [selectedCategory, selectedLocation, searchTerm, events, priceFilter]);

  const handleNearbyEvents = (selectedRadius: number) => {
    console.log("handleNearbyEvents called with radius:", selectedRadius);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Geolocation obtained:", { latitude, longitude });
          const nearbyEvents = await getNearbyEvents(latitude, longitude, selectedRadius);
          console.log("Nearby events:", nearbyEvents);
          setFilteredEvents(nearbyEvents);
        },
        (error) => {
          console.error("Error obtaining geolocation:", error);
        }
      );
    } else {
      alert("La geolocalización no es compatible con este navegador.");
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Encuentra Eventos
            </h1>
            <p className="text-md text-gray-300 max-w-3xl mx-auto">
              Descubre los mejores eventos en tu ciudad y vive experiencias inolvidables
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-10">
            {/* Filtros */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Filtro de categoría */}
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  {/* Renderizar opciones de categorías */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Filtro de ubicación */}
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Todas las ubicaciones</option>
                  {/* Renderizar opciones de ubicaciones */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Filtro de precio */}
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="">Todos los precios</option>
                  <option value="0">Gratis</option>
                  <option value="50">Hasta 50</option>
                  <option value="100">Hasta 100</option>
                  <option value="500">Hasta 500</option>
                  <option value="1000">Hasta 1000</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {/* Botón de eventos cercanos */}
              <div className="relative">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
                  Eventos cercanos a mi
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {[5, 10, 15, 20, 50].map((km) => (
                      <li key={km}>
                        <button
                          onClick={() => handleNearbyEvents(km)}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                        >
                          {km} km
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Lista de eventos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents &&
                filteredEvents.map((event: IEvents) => {
                  if (!event.location_id) {
                    return null; // O puedes manejarlo de otra manera, como mostrar un mensaje de error
                  }
                  return (
                    <motion.div
                      key={event.eventId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-900 bg-opacity-50 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="relative h-56">
                        <Image
                          className="w-full h-56 object-cover object-center"
                          src={event.imageUrl || "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"}
                          alt={event.name}
                          loading="lazy"
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 transform hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                          <Link
                            href={`/events/${event.eventId}`}
                            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                          >
                            Ver Detalles
                          </Link>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold mb-3 line-clamp-2">{event.name}</h3>
                        <div className="flex items-center text-gray-300 mb-2">
                          <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <MapPin className="h-5 w-5 mr-2 text-purple-400" />
                          <span>{event.location_id.city}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
                          <span>{event.price}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <Users className="h-5 w-5 mr-2 text-purple-400" />
                          <span>Tickets disponibles: {event.quantityAvailable}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

              {filteredEvents.length === 0 && (
                <div className="text-center">
                  <p className="text-2xl text-gray-400 mb-4">No se encontraron eventos que coincidan con tu búsqueda.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                      setSelectedLocation("");
                    }}
                    className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EncontraEventos;
