"use client";

import React, { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/IEventos";
import CardEdit from "@/components/CardEdit";
import { useGetAllEvents } from "@/helpers/events.helper";

export const GestionEventos = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const { result, loading, error } = useGetAllEvents();
  console.log(result);

  useEffect(() => {
    if (result) {
      setEvents(result);
    }
  }, [result]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los eventos</div>;
  }

  const eventsToApprove = events.filter((event) => event.approved === false);
  const eventsApproved = events.filter((event) => event.approved === true);

  return (
    <section>
      {eventsToApprove.length !== 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
          <h3 className="text-2xl font-semibold text-slate-200 text-start col-span-1 sm:col-span-3 lg:col-span-5">
            Eventos por aprobar
          </h3>
          {eventsToApprove.map((event) => (
            <CardEdit key={event.eventId} event={event} />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
        <h3 className="text-2xl font-semibold text-slate-200 text-start col-span-1 sm:col-span-3 lg:col-span-5 ">
          Eventos aprobados
        </h3>
        {eventsApproved.map((event) => (
          <CardEdit key={event.eventId} event={event} />
        ))}
      </div>
    </section>
  );
};

export default GestionEventos;
