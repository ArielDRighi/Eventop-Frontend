"use client";

import React, { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/IEventos";
import CardClient from "@/components/CardsClient";
import { useGetAllEvents } from "@/helpers/events.helper";
import { useUserContext } from "@/context/userContext";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

const DashboardClientSection = () => {
  const [eventsToApprove, setEventsToApprove] = useState<IEvent[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<IEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const { userId } = useUserContext();
  const { result, error } = useGetAllEvents() as { result: IEvent[] | null; loading: boolean; error: any };

  useEffect(() => {
    if (result !== null) {
      const now = new Date();
      const userEvents = result.filter((event) => event.user.userId == Number(userId));

      setEventsToApprove(userEvents.filter((event) => event.approved == false));
      setApprovedEvents(
        userEvents.filter(
          (event) => event.approved === true && new Date(event.date) >= now
        )
      );
      setPastEvents(userEvents.filter((event) => new Date(event.date) < now));
      setIsLoading(false);
    } else if (error) {
      setIsError(error);
      setIsLoading(false);
    }
  }, [result, error, userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">{isError}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="text-center my-8">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Bienvenido a tu Dashboard de Eventos
        </h1>
        <p className="text-gray-500 text-2xl font-semibold">Aquí puedes gestionar todos tus eventos.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-2xl h-xl font-extrabold mb-8 bg-clip-text bg-gradient-to-r text-gray-200 ext-center">
            <XCircle className="inline-block mr-2" /> Eventos por aprobar
          </h3>
          <div className="flex flex-col max-w-2xl overflow-scroll gap-8 bg-gray-900 p-4 rounded-lg shadow-lg">
            {eventsToApprove.length > 0 ? (
              eventsToApprove.map((event) => (
                <CardClient key={event.eventId} event={event} />
              ))
            ) : (
              <div>
                <p className="text-slate-500">No hay eventos por aprobar</p>
                <button
                  onClick={() => window.open("/client/create-event", "_blank")}
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Crear Evento
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8  bg-clip-text bg-gradient-to-r text-gray-200 text-center">
            <CheckCircle className="inline-block mr-2" /> Eventos aprobados
          </h3>
          <div className="flex flex-col max-w-2xl gap-8 overflow-scroll bg-gray-900 p-4 rounded-lg shadow-lg">
            {approvedEvents.length > 0 ? (
              approvedEvents.map((event) => (
                <CardClient key={event.eventId} event={event} />
              ))
            ) : (
              <p className="text-slate-500">No hay eventos aprobados</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8  bg-clip-text text-gray-200 text-center">
            <Calendar className="inline-block mr-2" /> Eventos pasados
          </h3>
          <div className="flex flex-col max-w-2xl overflow-scroll gap-8 bg-gray-900 p-4 rounded-lg shadow-lg">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <CardClient key={event.eventId} event={event} />
              ))
            ) : (
              <p className="text-slate-500">No hay eventos pasados</p>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center mt-12">
        <p className="text-gray-400">© 2023 Eventop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default DashboardClientSection;
