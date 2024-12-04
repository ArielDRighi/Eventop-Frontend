"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEvent } from "@/interfaces/IEventos";
import CardClient from "@/components/CardsClient";
import { useGetAllEvents } from "@/helpers/events.helper";
import { useUserContext } from "@/context/userContext";

const DashboardClientSection = () => {
  const [eventsToApprove, setEventsToApprove] = useState<IEvent[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<IEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const { userId } = useUserContext();
  const router = useRouter();
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

      <div className="max-w-6xl mx-auto space-y-12 grid grid-cols-1 md:grid-cols-3 text-center">
        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos por aprobar
          </h3>
          <div className="flex flex-col max-w-2xl overflow-scroll  gap-8 bg-gray-900">
          {eventsToApprove.length > 0 ? (
          eventsToApprove.map((event) => (
            <CardClient key={event.eventId} event={event} />
          ))
        ) : (
          <div>
            <p className="text-white">No hay eventos por aprobar</p>
            <button className="btn" onClick={() => router.push("/client/create-event")}>
              Crear Evento
            </button>
          </div>
        )}
            
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos aprobados
          </h3>
          <div className="flex flex-col max-w-2xl gap-8 overflow-scroll  bg-gray-900">
            {approvedEvents.map((event) => (
              <CardClient key={event.eventId} event={event} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos pasados
          </h3>
          <div className="flex flex-col max-w-2xl overflow-scroll gap-8 bg-gray-900">
            {pastEvents.map((event) => (
              <CardClient key={event.eventId} event={event} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default DashboardClientSection;
