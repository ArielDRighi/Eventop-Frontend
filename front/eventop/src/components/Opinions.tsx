'use client'

import { useState } from 'react'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'

// This is example data. Replace with your actual data.
const reviews = [
  { id: 1, name: 'Ana García', rating: 5, comment: 'Increíble experiencia, lo recomiendo totalmente!' },
  { id: 2, name: 'Carlos Rodríguez', rating: 4, comment: 'Muy buen evento, aunque la cola para entrar fue un poco larga.' },
  { id: 3, name: 'Laura Martínez', rating: 5, comment: 'El mejor concierto al que he asistido. La organización fue perfecta.' },
  { id: 4, name: 'Miguel Sánchez', rating: 3, comment: 'El evento estuvo bien, pero esperaba más variedad en la comida.' },
]

export default function Component() {
  const [expandedReview, setExpandedReview] = useState<number | null>(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [policyExpanded, setPolicyExpanded] = useState(false)

  const toggleReview = (id: number) => {
    setExpandedReview(expandedReview === id ? null : id)
  }

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2)

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* User Reviews Section */}
        <section className="bg-purple-500 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-6">Opiniones de Usuarios</h2>
          <div className="space-y-6">
            {visibleReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{review.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-yellow-300' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleReview(review.id)}
                    className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    {expandedReview === review.id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                <p className={`mt-2 text-gray-100 font-semibold ${
                  expandedReview === review.id ? '' : 'line-clamp-2'
                }`}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
          {reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="mt-6 w-full font-semibold bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              {showAllReviews ? 'Ver menos reseñas' : 'Ver todas las reseñas'}
            </button>
          )}
        </section>

        {/* Refund Policy Section */}
        <section className="bg-purple-500 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-4">Política de Devoluciones y Cambios</h2>
          <div className="prose prose-purple">
            <p className="text-white mb-4">
              Entendemos que los planes pueden cambiar. Nuestra política está diseñada para ser justa tanto para los asistentes como para los organizadores del evento.
            </p>
            <button
              onClick={() => setPolicyExpanded(!policyExpanded)}
              className="flex items-center text-white hover:text-purple-800 transition-colors duration-200"
            >
              {policyExpanded ? 'Ocultar detalles' : 'Ver detalles completos'}
              {policyExpanded ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
            </button>
            {policyExpanded && (
              <ul className="mt-4 space-y-2 text-white font-sans">
                <li>Reembolso completo disponible hasta 7 días antes del evento.</li>
                <li>50% de reembolso disponible entre 7 días y 48 horas antes del evento.</li>
                <li>No se ofrecen reembolsos dentro de las 48 horas previas al evento.</li>
                <li>Los cambios de fecha están sujetos a disponibilidad y pueden incurrir en una tarifa de gestión.</li>
                <li>En caso de cancelación del evento por parte del organizador, se ofrecerá un reembolso completo.</li>
              </ul>
            )}
          </div>
        </section>
        

      </div>
    </div>
  )
}