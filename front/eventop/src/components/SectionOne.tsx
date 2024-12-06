"use client";

import React from "react";
import { useUserContext } from "@/context/userContext";
import { Ticket, Search, Calendar, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const LandingPage = () => {
  const { role } = useUserContext();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const features = [
    {
      icon: Calendar,
      title: "Eventos Diarios",
      description: "Nuevas experiencias cada día",
    },
    {
      icon: MapPin,
      title: "Ubicaciones Diversas",
      description: "Encuentra eventos cerca de ti",
    },
    {
      icon: TrendingUp,
      title: "Tendencias Populares",
      description: "Descubre lo más Reciente",
    },
  ];

  return (
    <div className="bg-gray-900 py-20">
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Columna de texto */}
          <div className="md:w-1/2 lg:w-2/3">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-5xl text-white font-bold mb-6"
              {...fadeInUp}
            >
              Descubre Eventos Increíbles en{" "}
              <motion.strong
                className="text-indigo-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                EvenTop
              </motion.strong>
            </motion.h1>
            <motion.p
              className="text-lg md:text-md font-mono lg:text-md text-gray-400 mb-8"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Descubre una amplia variedad de eventos adaptados a tus intereses.{" "}
              <br />
              Encuentra experiencias únicas cerca de ti, filtradas por ciudades
              y lugares.
            </motion.p>

            {/* Botones */}
            <div className="flex gap-2">
              <Link
                href="/events"
                className="inline-flex items-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-md"
              >
                <Search className="mr-2 h-5 w-5" />
                Explorar Eventos
              </Link>
              {!role && (
                <Link
                  href="/login"
                  className="inline-flex items-center bg-purple-700 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-md"
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Crear Cuenta
                </Link>
              )}
            </div>
          </div>

          {/* Imagen */}
          <div className="md:w-1/2 lg:w-1/3 mt-8 md:mt-0">
            <div className="relative aspect-[4/4] overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://i.pinimg.com/736x/0d/ef/41/0def4129c00227e24547f168c1cc4a35.jpg"
                alt="Event image"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <motion.div
        className="container mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-900 mt-10 rounded-lg p-6 shadow-lg"
          >
            <div className="flex flex-col items-center">
              <feature.icon className="h-10 w-10 text-indigo-500 mb-2" />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-400 text-center mt-2">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPage;
