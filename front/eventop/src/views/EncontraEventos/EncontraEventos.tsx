"use client";

import { useGetAllCategories } from "@/helpers/categories.helpers";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ICategory } from "@/interfaces/ICategoty";
import { IEvents } from "@/interfaces/IEventos";
import { ILocation } from "@/interfaces/ILocations";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  const getEvents = async () => {
    try {
      const res = await fetch(`${APIURL}/events`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data;
      }
      throw new Error("Error al obtener los eventos.");
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { result: locationsData, error: locationsError } = useGetAllLocations();
  const { result: categoriesData, error: categoriesError } = useGetAllCategories();

  useEffect(() => {
    const loadData = async () => {
      const eventsData = await getEvents();

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

      setEvents(eventsData);
      setFilteredEvents(eventsData);
    };

    loadData();
  }, [locationsData, categoriesData, locationsError, categoriesError]);

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
            <h2 className="text-3xl font-bold mb-6 text-center">Filtrar Eventos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      index === 0 ? setSelectedCategory(e.target.value) : setSelectedLocation(e.target.value)
                    }
                  >
                    <option value="">{`Todas las ${label.toLowerCase()}s`}</option>
                    {(index === 0 ? categories : locations).map((item: any) => (
                      <option
                        key={item[index === 0 ? "categoryId" : "locationId"]}
                        value={item[index === 0 ? "categoryId" : "locationId"].toString()}
                      >
                        {index === 0 ? item.name : item.city}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
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
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

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
                        src={
                          event.imageUrl ||
                          "data:image/png;base64,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"
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
                    </div>
                  </motion.div>
                );
              })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
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
      </section>
    </div>
  );
};
