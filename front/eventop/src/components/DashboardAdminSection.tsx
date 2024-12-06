"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  PlusCircle,
  List,
  TrendingUp,
} from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  count: number;
  bgColor: string;
  icon: React.ReactNode;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  count,
  bgColor,
  icon,
}) => (
  <div
    className={`${bgColor} rounded-xl p-4 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-xs md:text-sm text-white text-opacity-80">
          {description}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-2xl md:text-3xl font-bold">{count}</div>
        {icon}
      </div>
    </div>
  </div>
);

const DashboardAdminSection = () => {
  const [openTickets, setOpenTickets] = useState(0);
  const [inProgressTickets, setInProgressTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

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

        const approved = allTickets.filter(
          (ticket: { approved: boolean }) => ticket.approved
        ).length;
        const pending = allTickets.filter(
          (ticket: { approved: boolean }) => !ticket.approved
        ).length;
        const rejected = allTickets.filter(
          (ticket: { rejected: boolean }) => ticket.rejected
        ).length;

        setOpenTickets(approved);
        setInProgressTickets(pending);
        setClosedTickets(rejected);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 text-white">
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <h1 className="text-xl sm:text-2xl text-purple-400 font-semibold lg:text-3xl font-bold mb-6 sm:mb-8 text-center lg:text-left animate-fade-in-down">
            Panel de Administración
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <section className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl ">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                  <Calendar className="mr-2" />
                  Gestión de Eventos
                </h2>
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="bg-gray-700 h-24 rounded-xl"
                        ></div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <EventCard
                        title="Eventos aprobados"
                        description="Eventos aprobados y publicados"
                        count={openTickets}
                        bgColor="bg-gradient-to-r from-green-500 to-green-600"
                        icon={<CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />}
                      />
                      <EventCard
                        title="Eventos por Aprobar"
                        description="Eventos pendientes de aprobación"
                        count={inProgressTickets}
                        bgColor="bg-gradient-to-r from-yellow-500 to-yellow-600"
                        icon={<Calendar className="w-6 h-6 sm:w-8 sm:h-8" />}
                      />
                      <EventCard
                        title="Eventos rechazados"
                        description="Eventos rechazados por incumplir normas"
                        count={closedTickets}
                        bgColor="bg-gradient-to-r from-red-500 to-red-600"
                        icon={<XCircle className="w-6 h-6 sm:w-8 sm:h-8" />}
                      />
                    </>
                  )}
                </div>
                <div className="mt-6 sm:mt-8 space-y-4">
                  <button className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full font-semibold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center group">
                    <PlusCircle className="mr-2 group-hover:animate-bounce" />
                    <a
                      href="/admin/events/create-event"
                      className="group-hover:animate-pulse"
                    >
                      Crear Nuevo Evento
                    </a>
                  </button>
                  <button className="bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full font-semibold transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center group">
                    <List className="mr-2 group-hover:animate-bounce" />
                    <a
                      href="/admin/events"
                      className="group-hover:animate-pulse"
                    >
                      Ver Todos los Eventos
                    </a>
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden  hover:shadow-2xl ">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
                  <Users className="mr-2" />
                  Gestión de Usuarios
                </h2>
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-4 sm:p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        Usuarios Registrados
                      </h3>
                      <p className="text-sm text-purple-200">
                        Usuarios actualmente registrados
                      </p>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold flex items-center">
                      {isLoading ? (
                        <div className="animate-pulse bg-white bg-opacity-20 h-12 w-24 rounded"></div>
                      ) : (
                        <>
                          {totalUsers}
                          <TrendingUp className="ml-2 text-green-300" />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-purple-300 rounded-full h-2.5">
                      <div
                        className="bg-white h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isLoading
                            ? "0%"
                            : `${(totalUsers / 1000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg w-full font-semibold transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 flex items-center justify-center group">
                    <Users className="mr-2 group-hover:animate-bounce" />
                    <a
                      href="/admin/users"
                      className="group-hover:animate-pulse"
                    >
                      Gestionar Usuarios
                    </a>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdminSection;
