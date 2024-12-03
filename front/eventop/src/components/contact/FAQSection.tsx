'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "¿Cómo puedo crear un nuevo ticket?",
    answer: "Para crear un nuevo ticket, inicia sesión en tu cuenta y haz clic en el botón 'Nuevo Ticket' en el dashboard. Completa el formulario con los detalles de tu evento y envíalo."
  },
  {
    question: "¿Cuál es el tiempo de respuesta promedio?",
    answer: "Nuestro tiempo de respuesta promedio es de 24 horas hábiles. Para problemas críticos, intentamos responder en menos de 4 horas."
  },
  {
    question: "¿Cómo puedo actualizar la información de mi ticket?",
    answer: "Puedes actualizar la información de tu ticket iniciando sesión, yendo a 'Mis Tickets', seleccionando el ticket que deseas actualizar y haciendo clic en 'Editar'."
  },
  {
    question: "¿Puedo eliminar un ticket una vez creado?",
    answer: "Sí, puedes eliminar un ticket en cualquier momento. Ve a 'Mis Tickets', selecciona el ticket y haz clic en la opción 'Eliminar'. Ten en cuenta que una vez eliminado, no podrás restaurarlo."
  },
  {
    question: "¿Puedo agregar imagenes a mi ticket?",
    answer: "Sí, puedes adjuntar una imagen a tu ticket al momento de crearlo"
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Preguntas Frecuentes</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-lg shadow-sm">
            <button
              className="flex justify-between font-semibold items-center w-full p-4 text-left text-gray-300"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-purple-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-purple-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-800">
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

