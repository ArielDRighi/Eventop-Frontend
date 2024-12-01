'use client'

import React from "react"
import { useUser } from "@auth0/nextjs-auth0/client"
import { Ticket, Search, Calendar, MapPin, TrendingUp } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

const LandingPage = () => {
  const { user } = useUser()

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-900">
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-3xl text-center mx-auto">
          <motion.h1 
            className="mb-8 text-4xl font-extrabold text-white sm:text-6xl"
            {...fadeInUp}
          >
            Descubre Eventos Increíbles en
            <motion.strong 
              className="mt-2 block font-extrabold text-purple-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              EvenTop
            </motion.strong>
          </motion.h1>

          <motion.p 
            className="mt-4 max-w-xl mx-auto text-lg text-gray-300 sm:text-xl/relaxed"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Descubre una amplia variedad de eventos adaptados a tus intereses. 
            Encuentra experiencias únicas cerca de ti, filtradas por ciudades y lugares.
          </motion.p>

          <motion.div 
            className="mt-12 flex flex-wrap gap-6 justify-center"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/events"
                className="group relative inline-flex items-center overflow-hidden rounded-full border border-purple-500 px-8 py-3 text-purple-500 hover:text-white focus:outline-none focus:ring transition-all duration-300 ease-in-out hover:bg-purple-500"
              >
                <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                  <Search className="h-5 w-5" />
                </span>

                <span className="text-sm font-medium transition-all duration-300 group-hover:mr-4">
                  Explorar Eventos
                </span>
              </Link>
            </motion.div>

            {!user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/api/auth/login"
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-white px-8 py-3 text-purple-600 hover:text-white focus:outline-none focus:ring transition-all duration-300 ease-in-out hover:bg-purple-600"
                >
                  <span className="absolute right-0 translate-x-full transition-transform duration-300 group-hover:-translate-x-4">
                    <Ticket className="h-5 w-5" />
                  </span>

                  <span className="text-sm font-medium transition-all duration-300 group-hover:mr-4">
                    Crear Cuenta
                  </span>
                </Link>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex flex-col items-center">
              <Calendar className="h-10 w-10 text-purple-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Eventos Diarios</h3>
              <p className="text-sm text-gray-400">Nuevas experiencias cada día</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-10 w-10 text-purple-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Ubicaciones Diversas</h3>
              <p className="text-sm text-gray-400">Encuentra eventos cerca de ti</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-10 w-10 text-purple-400 mb-2" />
              <h3 className="text-lg font-semibold text-white">Tendencias Populares</h3>
              <p className="text-sm text-gray-400">Descubre lo más Reciente</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LandingPage

