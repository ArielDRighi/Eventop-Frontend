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
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-600 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-purple-600 rounded group-hover:-ml-4 group-hover:-mb-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-purple-600 rounded-md group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    <Link href="/login">Unete</Link>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 lg:mt-0 lg:col-span-6">
            <section className="relative py-6 sm:py-10 lg:py-24 w-full">
              <div className="px-4 mx-auto sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl text-white font-extrabold mx-auto md:text-5xl lg:text-5xl">¿Cómo funciona?</h2>
                  <p className="max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 leading-relaxed md:text-xl">
                    Organiza y gestiona tus eventos de manera sencilla
                  </p>
                </div>
                <div className="relative mt-8 sm:mt-12 lg:mt-20">
                  <div className="absolute inset-x-0 hidden md:block 
                    px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 top-2">
                    <svg 
                      className="w-full max-w-[1000px] mx-auto"
                      height="30" 
                      viewBox="0 0 1000 20" 
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,10 Q250,0 500,10 T1000,10"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="2"
                        strokeDasharray="8,8"
                        className="opacity-60 transition-all duration-300"
                      />
                    </svg>
                  </div>
                  <div className="relative grid grid-cols-1 text-center gap-y-6 
                    sm:gap-y-8 md:gap-y-12 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8">
                    <div>
                      <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-lg sm:text-xl font-semibold text-purple-600">1</span>
                      </div>
                      <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl text-white font-semibold leading-tight md:mt-10">Crea tu evento</h3>
                      <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400 md:text-lg">
                        Configura los detalles de tu evento en minutos
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-purple-600">2</span>
                      </div>
                      <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">Personaliza tickets</h3>
                      <p className="mt-4 text-base text-gray-400 md:text-lg">
                        Define tipos de entradas y precios a tu medida
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-purple-600">3</span>
                      </div>
                      <h3 className="mt-6 text-xl text-white font-semibold leading-tight md:mt-10">¡Publica!</h3>
                      <p className="mt-4 text-base text-gray-400 md:text-lg">
                        Comparte y vende tickets al instante
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 m-auto max-w-xs h-[257px] sm:h-[357px] blur-[118px] sm:max-w-md md:max-w-lg"
                style={{background: 'radial-gradient(1.89deg, rgba(34, 78, 95, 0.4) -1000%, rgba(191, 227, 205, 0.26) 1500.74%, rgba(34, 140, 165, 0.41) 56.49%, rgba(28, 47, 99, 0.11) 1150.91%)'}}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTwo;
