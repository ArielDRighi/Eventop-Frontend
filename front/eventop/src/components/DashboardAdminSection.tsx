"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const DashboardAdminSection = () => {
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const token = Cookies.get("accessToken");

      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/total-users`,
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching total users");
          }
          const data = await response.json();
          setTotalUsers(data);
        } catch (error) {
          console.error("Error fetching total users:", error);
        }
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events`
        );
        if (!response.ok) {
          throw new Error("Error fetching tickets");
        }
        const allTickets = await response.json();

        const open = allTickets.filter(
          (ticket: { approved: boolean; date: string }) =>
            !ticket.approved && new Date(ticket.date) > new Date()
        ).length;
        const inProgress = allTickets.filter(
          (ticket: { approved: boolean; date: string }) =>
            !ticket.approved && new Date(ticket.date) <= new Date()
        ).length;
        const closed = allTickets.filter(
          (ticket: { approved: boolean }) => ticket.approved
        ).length;

        setOpenTickets(open);
        setInProgressTickets(inProgress);
        setClosedTickets(closed);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <main className="p-6 bg-gray-900">
        <div className="container mx-auto">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 text-black shadow rounded-xl p-4">
              <h2 className="text-xl font-semibold text-black mb-4">
                Gestión de Eventos
              </h2>

              <div className="mb-4">
                <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">Eventos aprobados</h3>
                    <p className="text-sm text-gray-500">
                      Eventos aprobados y publicados
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {openTickets}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-yellow-100 p-4 rounded-lg mt-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Eventos por Aprobar
                    </h3>
                    <p className="text-sm text-gray-500">
                      Eventos pendientes de aprobación
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {inProgressTickets}
                  </div>
                </div>

                <div className="flex items-center justify-between bg-green-100 p-4 rounded-lg mt-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Eventos rechazados
                    </h3>
                    <p className="text-sm text-gray-500">
                      Eventos rechazados por incumplir normas
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {closedTickets}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2">
                  Crear Nuevo Evento
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full">
                  Ver Todos los Eventos
                </button>
              </div>
            </div>

            <div className="bg-gray-100 text-black shadow rounded-xl p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Gestión de Usuarios
              </h2>

              <div className="mb-4">
                <div className="flex items-center justify-between bg-blue-100 p-4 rounded-lg">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Usuarios Registrados
                    </h3>
                    <p className="text-sm text-gray-500">
                      Usuarios actualmente registrados
                    </p>
                  </div>
                  <div className="text-xl font-semibold text-gray-800">
                    {totalUsers}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdminSection;
