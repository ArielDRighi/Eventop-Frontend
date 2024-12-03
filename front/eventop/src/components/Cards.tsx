"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
// import { motion } from "framer-motion";

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

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
  <Link
    key={`event-${event.eventId}`}
    href={`/events/${event.eventId}`}
    className="block h-full"
  >
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out h-full flex flex-col">
      <div className="relative h-48 w-full group">
        <Image
          className="w-full h-full object-cover object-center"
          src={event.imageUrl || "https://i.pinimg.com/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"}
          alt={event.name}
          loading="lazy"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://i.pinimg.com/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg";
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <span className="text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
            Ver Detalles
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col h-[200px]">
        <h3 className="text-white text-xl font-semibold mb-3 line-clamp-2">
          {event.name}
        </h3>
        <div className="flex-grow flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-gray-400 font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-500 mr-2 flex-shrink-0"
              >
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
              </svg>
              <span className="line-clamp-1">{event.location_id.city}</span>
            </p>
            <p className="text-gray-400 font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-purple-500 mr-2 flex-shrink-0"
              >
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M11 15h1" />
                <path d="M12 15v3" />
              </svg>
              <span className="line-clamp-1">{event.date}</span>
            </p>
          </div>
          <div className="mt-auto">
            <span className="text-sm text-gray-100 font-semibold px-2 py-1 bg-purple-900 rounded-md line-clamp-1 inline-block">
              {event.category_id?.name || "Sin categoría"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const Cards: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        );
        const data: Event[] = await response.json();

        const upcomingEvents = data.filter(
          (event) =>
            new Date(event.date) >= new Date() && event.approved === true
        );
        setEvents(upcomingEvents);
      } catch (error) {
        setError("Error al cargar los eventos");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const renderContent = useMemo(() => {
    if (loading)
      return (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        </div>
      );
    if (error) return <div>{error}</div>;

    return events.length ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={`event-${event.eventId}`} event={event} />
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-400">
        No hay eventos disponibles
      </div>
    );
  }, [events, loading, error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto">
        <div className="card mb-12">
          <div className="loader">
            <p className="text-3xl font-bold text-purple-300">Eventos</p>
            <div className="words">
              <span className="word">Musicales</span>
              <span className="word">Deportivos</span>
              <span className="word">Culturales</span>
              <span className="word">Sociales</span>
              <span className="word">Musicales</span>
            </div>
          </div>
        </div>
        {renderContent}
      </main>
    </div>
  );
};

export default Cards;
