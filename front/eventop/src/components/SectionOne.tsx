"use client"

import Image from "next/image";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const LayoutOne = () => {

  const { user } = useUser();
  return (
    <div className="flex justify-center">
      <div>
        <section>
          <section className="sticky">
            <div className="max-w-lg px-4 sm:pt-24 pt-12 sm:pb-8 mx-auto text-left lg:max-w-6xl md:text-center">
              <h1 className="font-extrabold leading-10 tracking-tight text-left text-white  sm:leading-none text-5xl sm:text-5xl">
                <span className="inline md:block">Gestion de Entradas en </span>
                <span className="relative mt-2 bg-clip-text text-purple-500 md:inline-block">
                  Minutos.
                </span>

                <br />
                <p className="text-sm font-black text-zinc-500 mt-4">
                  Olvidate del caos en tus eventos y dale una impresion mas
                  profesional a tus clientes.
                </p>
              </h1>
            </div>

            
            <div className="max-w-lg px-4 pb-24 mx-auto text-left md:max-w-none md:text-center">
              <div className="text-center py-4 space-x-4">
                {!user && (
                  <button className="backdrop-blur-sm transition duration-500 ease-in-out bg-purple-500 border border-[#E2E8F0] translate-y-1 text-white hover:bg-purple-800 text-lg font-semibold py-3 px-6 rounded-3xl inline-flex items-center">
                    <span>
                      <a href={"/api/auth/login"}>Crear Cuenta</a>
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
                        <div>
                          <p className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                            Encuentra Tickets Donde sea que estes.
                          </p>
                          <p className="max-w-xl mt-4 text-base tracking-tight text-zinc-500">
                            
En nuestra página, podrás descubrir una amplia variedad de eventos adaptados a tus intereses y necesidades. Si estás buscando algo cerca de tu ubicación, tenemos eventos filtrados por diferentes ciudades y lugares, asegurando que puedas disfrutar de actividades sin importar dónde te encuentres. Además, ofrecemos una opción de filtrado por precio, para que encuentres eventos que se ajusten a tu presupuesto. Ya sea que prefieras experiencias gratuitas, como conciertos o festivales, o si deseas asistir a eventos exclusivos con un precio más elevado, tenemos opciones para todos. Explora eventos que van desde actividades gratuitas hasta experiencias de lujo, todo al alcance de un clic.
                          </p>
                        </div>
                        <div className="flex justify-center gap-3 mt-10 lg:justify-start">
                          <a
                            className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600"
                            href="#"
                          >
                            <span className="text-purple-500">
                              {" "}
                              Explorar &nbsp; →{" "}
                            </span>
                          </a>
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
