"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEvent } from "@/interfaces/IEventos";
import CardEdit from "@/components/CardEdit";
import { useGetAllEvents } from "@/helpers/events.helper";
import { useUserContext } from "@/context/userContext";

const DashboardClientSection = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsToApprove, setEventsToApprove] = useState<IEvent[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<IEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const[isError, setIsError] = useState(null);
  const { userId } = useUserContext();
  const router = useRouter();
  const { result, loading, error } = useGetAllEvents() as { result: IEvent[] | null; loading: boolean; error: any };

  useEffect(() => {
    // Fetch events from API or context
      // Replace with your API call

      const now = new Date();
      if (result !== null) {
        setEvents(result.filter((event) => event.user.userId == Number(userId)));
        setEventsToApprove(events.filter((event) => event.approved == false));
        setApprovedEvents(
          events.filter(
            (event) => event.approved === true && new Date(event.date) >= now
          )
        );
        setPastEvents(events.filter((event) => new Date(event.date) < now));
      }
      setIsLoading(loading);
      setIsError(error);
  
  }, [loading, error, result, approvedEvents, pastEvents]);

  return (
    <section className="gap-4 grid grid-cols-1 md:grid-cols-3">
     
        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos por aprobar
          </h3>
          <div className="grid grid-cols-1 gap-8 text-center bg-gray-900">
            {eventsToApprove.length > 0 ? (
              eventsToApprove.map((event) => (
                <CardEdit key={event.eventId} event={event} />
              ))
            ) : (
              <div>
              <p>No hay eventos creados</p>
              <button 
              onClick={() => router.push("/cliente/create-event")}
              className="btn">
                Crear evento</button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos aprobados
          </h3>
          <div className="grid grid-cols-1 gap-8 bg-gray-900 text-center">
            {approvedEvents.map((event) => (
              <CardEdit key={event.eventId} event={event} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
            Eventos pasados
          </h3>
          <div className="grid grid-cols-1  gap-8 bg-gray-900">
            {pastEvents.map((event) => (
              <CardEdit key={event.eventId} event={event} />
            ))}
          </div>
        </div>

    </section>
  );
};

export default DashboardClientSection;
