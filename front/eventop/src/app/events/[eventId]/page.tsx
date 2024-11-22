"use client";

import {  useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import Payments from '@/components/Payments';
import { useEventById } from '@/helpers/events.helper';



export default function DetallesEvento () {
  const [showPayment, setShowPayment] = useState(false);

  const params = useParams();
<<<<<<< Updated upstream
  console.log(params);
  const eventId = params.eventId as string;
  console.log(eventId);
  
  const { event, loading, error } = useEventById(eventId);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
=======
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
>>>>>>> Stashed changes
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">{error}</div>;
  }

  if (!event) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Evento no encontrado.</div>;
  }

  return (
<<<<<<< Updated upstream
     
    <div className='bg-gray-900'>
    <div className="min-h-screen  bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-64 text-black font-semibold w-full object-cover md:w-48"
              src={event.imageUrl || "data:image/png;base64,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"}
              alt={event.name}
              width={192}
              height={192}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold">
              {event.category_id.name}
            </div>
            <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
              {event.name}
            </h1>
            <p className="mt-2 text-gray-500">Descripción del evento aquí.</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>Horario</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location_id.city}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>Capacidad</span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {!showPayment ? (
                <button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 font-semibold transition duration-300"
                >
                  Comprar Entradas
                </button>
              ) : (
                <Link
                  href="#payment"
                  className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Ir al pago
                </Link>
              )}
            </motion.div>
          </div>
        </div>
=======
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
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
                  "/placeholder.svg?height=448&width=448"
                }
                alt={event.name}
                width={448}
                height={448}
                priority
              />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-start">
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
>>>>>>> Stashed changes
      </div>

      {showPayment && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-gray-900"
          id="payment"
        >
          <Payments />
        </motion.div>
      )}
    </div>
   

    </div> 

  );
}