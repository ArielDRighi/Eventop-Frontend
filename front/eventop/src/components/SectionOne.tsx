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
    <div className="bg-gray-900 text-gray-100 pb-6 mt-10 sm:pb-8 lg:pb-12">
      <section className="container mx-auto px-4 md:px-8">
        <div className="mb-8 flex flex-col lg:flex-row justify-between md:mb-16">
          <motion.div
            className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/2 lg:pr-8"
            {...fadeInUp}
          >
            <motion.h1 className="mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
              Descubre Eventos Increíbles en
              <motion.strong
                className="mt-2 block font-extrabold text-purple-500"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                EvenTop
              </motion.strong>
            </motion.h1>

            <motion.p
              className="max-w-md leading-relaxed text-gray-400 xl:text-md"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Descubre una amplia variedad de eventos adaptados a tus intereses.
              Encuentra experiencias únicas cerca de ti, filtradas por ciudades
              y lugares.
            </motion.p>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/2] overflow-hidden rounded-xl shadow-lg">
              {/* Imagen */}
              <Image
                src="https://i.pinimg.com/736x/16/55/9d/16559dff39dc0d13c60b7fea6fe5e0d8.jpg"
                alt="Event image"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              {/* Capa oscura */}
              <div className="absolute inset-0 bg-black bg-opacity-30 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Explorar Eventos
            </Link>

            {!role && (
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-purple-800 text-white font-semibold hover:bg-purple-600 transition duration-300"
              >
                <Ticket className="mr-2 h-5 w-5" />
                Crear Cuenta
              </Link>
            )}
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 lg:justify-start"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          ></motion.div>
        </div>
      </section>

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
