"use client";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

import React, { useEffect, useState } from "react";
import { IEvents } from "@/interfaces/IEventos";
import CardEdit from "@/components/CardEdit";


export const GestionEventos = () => {
  const [events, setEvents] = useState<IEvents[]>([]);


  const getEvents = async () => {
    try {
      const res = await fetch(`${APIURL}/events`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("Error al obtener los eventos.");
    } catch (error: any) {
      console.log(error);
      throw new Error("Error al obtener los eventos.");
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData);
    };
    loadEvents();
  }, []);


  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
      {events.map((event) => (
        <CardEdit key={event.eventId} event={event} />
      ))}
   </section>
  );
};

export default GestionEventos