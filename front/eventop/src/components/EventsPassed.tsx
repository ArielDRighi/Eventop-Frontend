"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Event {
  eventId: number;
  name: string;
  date: string;
  description: string;
  imageUrl: string;
  category_id: {
    categoryId: number;
    name: string;
  };
  location_id: {
    locationId: number;
    city: string;
    state: string;
    country: string;
    address: string;
  };
  price: string;
  quantityAvailable: number;
  quantitySold: number;
  quantityTotal: number;
  approved: boolean;
  currency: string;
}

export default function Component() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        ); // Adjust the API endpoint as needed
        const data: Event[] = await response.json();
        console.log(data);

        const pastEvents = data.filter(
          (event) => new Date(event.date) < new Date()
        );
        setEvents(pastEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-900">
      <div className="bg-gradient-to-b from-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">
            Galería de Eventos Pasados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((item) => (
              <motion.div
                key={item.eventId}
                className="relative overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setHoveredId(item.eventId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Image
                  src={item.imageUrl || "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"}
                  alt={item.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-60 flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === item.eventId ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-300 text-center font-semibold text-sm sm:text-base">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
