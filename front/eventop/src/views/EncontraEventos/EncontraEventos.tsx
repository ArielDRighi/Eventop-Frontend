"use client";

import { useGetAllCategories } from "@/helpers/categories.helpers";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ICategory } from "@/interfaces/ICategory";
import { IEvent } from "@/interfaces/IEventos";
import { ILocation } from "@/interfaces/ILocations";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const EncontraEventos = () => {
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>([]);
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
      const res = await fetch(`${APIURL}/events`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Error al obtener los eventos.");
    } catch (error) {
      return error;
    }
  };

  const getNearbyEvents = async (
    latitude: number,
    longitude: number,
    radius: number
  ) => {
    try {
      const res = await fetch(
        `${APIURL}/events/nearby?latitude=${latitude}&longitude=${longitude}&radius=${radius}`
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Error al obtener los eventos cercanos.");
    } catch (error) {
      return error;
    }
  };

  const { result: locationsData, error: locationsError } = useGetAllLocations();
  const { result: categoriesData, error: categoriesError } =
    useGetAllCategories();

  useEffect(() => {
    const loadData = async () => {
      const eventsData: IEvent[] = await getEvents();

      if (locationsData) {
        setLocations(locationsData);
      }

      if (categoriesData) {
        setCategories(categoriesData);
      }

      if (locationsError) {
        console.error("Error al obtener las ubicaciones:", locationsError);
      }
      if (categoriesError) {
        console.error("Error al obtener las categorías:", categoriesError);
      }
      const upcomingEvents = eventsData.filter(
        (event) => new Date(event.date) >= new Date() && event.approved === true
      );
      setEvents(upcomingEvents);
      setFilteredEvents(upcomingEvents);
    };

    loadData();
  }, [locationsData, categoriesData, locationsError, categoriesError]);

  useEffect(() => {
    const filtered = events.filter((evento: IEvent) => {
      const matchesCategory =
        selectedCategory === "" ||
        (evento.category_id &&
          evento.category_id.categoryId === parseInt(selectedCategory));
      const matchesLocation =
        selectedLocation === "" ||
        (evento.location_id &&
          evento.location_id.locationId === parseInt(selectedLocation));
      const matchesSearch =
        searchTerm === "" ||
        evento.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRadius = radius === 10;

      const price = evento.price;
      const priceFilterNumber = priceFilter === "0" ? 0 : parseInt(priceFilter);

      const matchesPrice =
        priceFilter === "" ||
        (priceFilter === "0" && price == "0") ||
        (priceFilter !== "0" &&
          price > "0" &&
          Number(price) <= priceFilterNumber);

      return (
        matchesCategory &&
        matchesLocation &&
        matchesSearch &&
        matchesPrice &&
        matchesRadius
      );
    });

    setFilteredEvents(filtered);
  }, [
    selectedCategory,
    selectedLocation,
    searchTerm,
    events,
    priceFilter,
    radius,
  ]);

  const handleNearbyEvents = (selectedRadius: number) => {
    setIsOpen(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const nearbyEvents = await getNearbyEvents(
            latitude,
            longitude,
            selectedRadius
          );
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-400">
              Encuentra Eventos
            </h1>
            <p className="text-md text-gray-300 max-w-3xl mx-auto">
              Descubre los mejores eventos en tu ciudad y vive experiencias
              inolvidables
            </p>
          </div>

          <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-10 relative z-[40]">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Filtrar Eventos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-[50]">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-300" />
              </div>

              {["Categoría", "Ubicación"].map((label, index) => (
                <div key={label} className="relative">
                  <select
                    className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
                    value={index === 0 ? selectedCategory : selectedLocation}
                    onChange={(e) =>
                      index === 0
                        ? setSelectedCategory(e.target.value)
                        : setSelectedLocation(e.target.value)
                    }
                  >
                    <option value="">{`Todas las ${label.toLowerCase()}s`}</option>
                    {(index === 0 ? categories : locations).map((item: any) => (
                      <option
                        key={item[index === 0 ? "categoryId" : "locationId"]}
                        value={item[
                          index === 0 ? "categoryId" : "locationId"
                        ].toString()}
                      >
                        {index === 0 ? item.name : item.city}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

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
              </div>

              <div className="relative z-[100]" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300 flex justify-between items-center"
                >
                  {radius === 10
                    ? "Eventos cercanos "
                    : `Eventos en ${radius} km`}
                  <svg
                    className={`fill-current h-4 w-4 transform ${
                      isOpen ? "rotate-180" : ""
                    } transition-transform`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-[101]">
                    <ul className="py-1">
                      {[5, 10, 15, 20, 50].map((km) => (
                        <li key={km}>
                          <button
                            onClick={() => {
                              setRadius(km);
                              handleNearbyEvents(km);
                            }}
                            className={`block px-4 py-2 text-white hover:bg-gray-700 w-full text-left ${
                              radius === km ? "bg-purple-600" : ""
                            }`}
                          >
                            {km} km
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-[30] ">
            {filteredEvents &&
              filteredEvents.map((event: IEvent) => {
                if (!event.location_id) {
                  return null;
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
                        src={
                          event.imageUrl ||
                          "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"
                        }
                        alt={event.name}
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
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                        {event.name}
                      </h3>
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
                    </div>
                  </motion.div>
                );
              })}

            {filteredEvents.length === 0 && (
              <div className="flex flex-col items-center justify-center space-y-5 p-8 bg-gray-900 rounded-lg shadow-inner">
                <p className="text-xl font-semibold text-gray-50">
                  No se encontraron eventos
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setRadius(10);
                    setSelectedCategory("");
                    setSelectedLocation("");
                    setPriceFilter("");
                  }}
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium text-base rounded-full hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
