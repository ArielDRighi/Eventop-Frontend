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
    <div className="bg-gray-900 min-h-screen -mt-12  px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* User Reviews Section */}
        <section className="body-font">
          <div className="container px-5 py-16 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Opiniones de Usuarios</h2>
              <p className="text-purple-400 text-lg">Lo que dicen nuestros clientes sobre nosotros</p>
              <div className="flex mt-4 justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-purple-500"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap -m-4">
              {visibleReviews.map((review) => (
                <div key={review.id} className="p-4 md:w-1/2 w-full">
                  <div className="h-full bg-gradient-to-br from-purple-900 to-purple-800 p-8 rounded-2xl shadow-2xl border border-purple-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/10 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="text-left">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-8 h-8 text-purple-400 mb-6" viewBox="0 0 975.036 975.036">
                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className={`leading-relaxed mb-8 text-gray-300 text-lg ${
                        expandedReview === review.id ? '' : 'line-clamp-2'
                      }`}>
                        {review.comment}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            alt={review.name} 
                            src="https://i.pinimg.com/736x/8b/87/8f/8b878f4e4a303bb30e2c4a31c2e6a6aa.jpg" 
                            className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center ring-2 ring-purple-500/50"
                          />
                          <span className="flex-grow flex flex-col pl-4">
                            <span className="font-medium text-white text-lg">{review.name}</span>
                            <div className="flex items-center mt-1 gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                  fill="currentColor"
                                />
                              ))}
                            </div>
                          </span>
                        </div>
                        <button
                          onClick={() => toggleReview(review.id)}
                          className="text-purple-400 hover:text-purple-300 transition-colors duration-200 p-2 rounded-full hover:bg-purple-800/50"
                        >
                          {expandedReview === review.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-12 mx-auto block font-semibold bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-8 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-lg"
              >
                {showAllReviews ? 'Ver menos reseñas' : 'Ver todas las reseñas'}
              </button>
            )}
          </div>
        </section>
        {/* Refund Policy Section */}
        <section className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl shadow-2xl p-8 border border-purple-700/30">
          <h2 className="text-3xl font-bold text-white mb-6">Política de Devoluciones y Cambios</h2>
          <div className="prose prose-purple">
            <p className="text-gray-300 text-lg mb-6">
              Entendemos que los planes pueden cambiar. Nuestra política está diseñada para ser justa tanto para los asistentes como para los organizadores del evento.
            </p>
            <button
              onClick={() => setPolicyExpanded(!policyExpanded)}
              className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200 text-lg font-medium"
            >
              {policyExpanded ? 'Ocultar detalles' : 'Ver detalles completos'}
              {policyExpanded ? <ChevronUp className="ml-2 w-5 h-5" /> : <ChevronDown className="ml-2 w-5 h-5" />}
            </button>
            {policyExpanded && (
              <ul className="mt-6 space-y-3 text-gray-300 font-sans list-none">
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
