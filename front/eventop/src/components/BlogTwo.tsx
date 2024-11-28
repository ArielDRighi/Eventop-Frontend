import Link from "next/link";
import React from "react";

const BlogTwo = () => {
  return (
    <div className="bg-gray-900 h-screen font-sans flex flex-grow items-center justify-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-12 lg:pt-0">
      <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center lg:justify-center">
        <div className="text-center lg:text-left">
          <div className="flex flex-col items-center justify-center lg:items-start">
            <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
              <p className="sm:block">Únete a</p>
              <span className="text-white md:block">la comunidad de</span>
              <p className="text-purple-500 md:block">EvenTop.</p>
            </h1>
          </div>
          <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <button className="relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all bg-purple-500 rounded-md group w-full sm:w-auto">
  <span
    className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-600 rounded group-hover:-mr-4 group-hover:-mt-4"
  >
    <span
      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-600 rounded group-hover:-ml-4 group-hover:-mb-4"
  >
    <span
      className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
    ></span>
  </span>
  <span
    className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-purple-600 rounded-md group-hover:translate-x-0"
  ></span>
  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
    <Link href="/api/auth/login">Unete</Link>
  </span>
</button>
          </div>
        </div>
      </div>

      <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 lg:flex lg:items-center lg:justify-center">
        <div className="text-center lg:text-left">
          <p className="text-base text-white sm:text-xl lg:text-lg xl:text-xl">
            Únete a la plataforma líder en venta de tickets. Llega a miles de
            personas y maximiza la visibilidad de tu evento.
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-3 gap-6 sm:gap-6 xl:gap-8">
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                      Usuarios Activos
                    </div>
                    <p className="text-4xl font-bold text-white">1K+</p>
                  </div>
                </div>
              </div>
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                      Eventos Activos
                    </div>
                    <p className="text-4xl font-bold text-white">2K+</p>
                  </div>
                </div>
              </div>
              <div className="text-center sm:flex sm:items-center sm:justify-center">
                <div className="sm:flex-shrink-0">
                  <div className="flow-root">
                    <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-white bg-purple-500 rounded-full">
                      Ciudades
                    </div>
                    <p className="text-4xl font-bold text-white">120+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default BlogTwo;
