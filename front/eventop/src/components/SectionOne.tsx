"use client";

import Image from "next/image";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Ticket } from "lucide-react";
import Link from "next/link";

const LayoutOne = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center">
      <div>
        <section>
          <section className="sticky">
            <div className="max-w-lg px-4 sm:pt-24 pt-12 sm:pb-8 mx-auto text-left lg:max-w-6xl md:text-center">
              <h1 className="mb-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                Gestión de Entradas en{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent animate-pulse">
                  Minutos
                </span>
              </h1>
            </div>

            <div className="max-w-lg px-4 pb-24 mx-auto text-left md:max-w-none md:text-center">
              <div className="text-center py-4 space-x-4">
                {!user && (
                  <button className="backdrop-blur-sm transition duration-500 ease-in-out bg-purple-500 border  translate-y-1 text-white hover:bg-purple-800 text-lg font-semibold py-3 px-6 rounded-3xl inline-flex items-center">
                    <span>
                      <a
                        href="/api/auth/login"
                        className="inline-flex items-center"
                      >
                        <Ticket className="mr-2 h-5 w-5" />
                        Crear Cuenta
                      </a>
                    </span>
                  </button>
                )}

                <button className="backdrop-blur-sm transition duration-500 ease-in-out bg-white border border-[#E2E8F0] translate-y-1 text-[#16161d] hover:bg-neutral-200 text-lg font-semibold py-3 px-6 rounded-3xl inline-flex items-center">
                  <span>
                    <a href={"/events"}>Eventos</a>
                  </span>
                </button>
              </div>
            </div>
          </section>
        </section>

        <div className="text-left">
          <div className="sm:px-28">
            <section className="relative flex items-center w-full">
              <div className="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl">
                <div className="relative flex-col items-start m-auto align-middle">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                    <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                      <div className="max-w-xl text-center lg:text-left">
                        <div className="text-center sm:text-left">
                          <p className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            Encuentra Tickets Donde sea que estés.
                          </p>
                          <p className="max-w-3xl mt-6 text-base tracking-tight text-zinc-500 mx-auto sm:mx-0">
                            En nuestra página, podrás descubrir una amplia
                            variedad de eventos adaptados a tus intereses y
                            necesidades. Si estás buscando algo cerca de tu
                            ubicación, tenemos eventos filtrados por diferentes
                            ciudades y lugares, asegurando que puedas disfrutar
                            de actividades sin importar dónde te encuentres.
                            <br className="hidden sm:block" />
                            Además, ofrecemos una opción de filtrado por precio,
                            para que encuentres eventos que se ajusten a tu
                            presupuesto. Ya sea que prefieras experiencias
                            gratuitas, como conciertos o festivales, o si deseas
                            asistir a eventos exclusivos con un precio más
                            elevado, tenemos opciones para todos. Explora
                            eventos que van desde actividades gratuitas hasta
                            experiencias de lujo, todo al alcance de un clic.
                          </p>
                        </div>
                        <div className="flex justify-center gap-3 mt-10 lg:justify-start">
                          <Link href={"/events"}>
                            <button
                              type="submit"
                              className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-purple-500 backdrop-blur-md lg:font-semibold isolation-auto  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-purple-600 hover:text-gray-100 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                            >
                              Explorar
                              <svg
                                className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-50 group-hover:border-none p-2 rotate-45"
                                viewBox="0 0 16 19"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                                  className="fill-gray-50 group-hover:fill-purple-600"
                                ></path>
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="order-first block w-full mt-12 aspect-square lg:mt-0">
                      <Image
                        className="object-cover rounded-3xl object-center w-full mx-auto bg-gray-300 lg:ml-auto "
                        alt="hero"
                        src="https://i.pinimg.com/originals/2e/2b/21/2e2b21aeed393403d4620367f9e093f9.gif"
                        width={440}
                        height={440}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-32" />
        </div>
      </div>
    </div>
  );
};

export default LayoutOne;
