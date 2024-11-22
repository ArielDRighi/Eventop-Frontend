"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Payments from "@/components/Payments";
import { useEventById } from "@/helpers/events.helper";

export default function DetallesEvento() {
  const [showPayment, setShowPayment] = useState(false);

  const params = useParams();
  const eventId = params.eventId as string;

  const { event, loading, error } = useEventById(eventId);

  if (loading) {
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
    <div className="bg-gray-900">
      <div className="min-h-screen bg-gradient-to-b py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="md:flex md:h-[28rem]">
              <div className="md:w-1/2 relative">
                <Image
                  className="h-full w-full object-cover"
                  src={
                    event.imageUrl ||
                    "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"
                  }
                  alt={event.name}
                  width={448}
                  height={448}
                  priority
                />
              </div>
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex flex-col h-full space-y-4">
                  <div>
                    <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
                      {event.category_id.name}
                    </div>
                    <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 line-clamp-2">
                      {event.name}
                    </h1>
                  </div>
                  <p className="text-base text-gray-700 flex-grow overflow-y-auto max-h-40 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {event.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0" />
                      <span className="truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0" />
                      <span className="truncate">Horario</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0" />
                      <span className="truncate">{event.location_id.city}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0" />
                      <span className="truncate">Capacidad</span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-auto pt-4"
                  >
                    {!showPayment ? (
                      <button
                        onClick={() => setShowPayment(true)}
                        className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 font-semibold transition duration-300 transform hover:scale-105"
                      >
                        Comprar Entradas
                      </button>
                    ) : (
                      <Link
                        href="#payment"
                        className="block w-full text-center bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
                      >
                        Ir al pago
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {showPayment && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
              id="payment"
            >
              <Payments />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
