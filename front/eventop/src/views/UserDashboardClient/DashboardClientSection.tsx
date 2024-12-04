"use client"

import React, { useEffect, useState } from "react";
import { IEvent } from "@/interfaces/IEventos";
import CardEdit from "@/components/CardEdit";
import { useGetAllEvents } from "@/helpers/events.helper";
import { useUserContext } from "@/context/userContext";

const DashboardClientSection = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventsToApprove, setEventsToApprove] = useState<IEvent[]>([]);
  const [approvedEvents, setApprovedEvents] = useState<IEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userId} = useUserContext();

  useEffect(() => {
    // Fetch events from API or context
    const fetchEvents = async () => {
      // Replace with your API call
      const { result, loading, error } = useGetAllEvents() as { result: IEvent[] | null; loading: boolean; error: any };

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
      setLoading(loading);
      setError(error);
    };

    fetchEvents();
  }, [loading, error, eventsToApprove, approvedEvents, pastEvents]);

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-200 text-center mb-4">
          Mis Eventos
        </h1>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h3 className="text-2xl font-semibold text-slate-200 text-start">
            Eventos por aprobar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
            {eventsToApprove.map((event) => (
              <CardEdit key={event.eventId} event={event} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-slate-200 text-start">
            Eventos aprobados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
            {approvedEvents.map((event) => (
              <CardEdit key={event.eventId} event={event} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-slate-200 text-start">
            Eventos pasados
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 bg-gray-900">
            {pastEvents.map((event) => (
              <CardEdit key={event.eventId} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardClientSection;
