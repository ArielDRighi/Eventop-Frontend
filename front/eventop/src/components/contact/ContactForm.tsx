'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData)
    // Resetear el formulario después de enviar
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Contáctanos</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-300 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-lg font-semibold text-gray-300 mb-2">
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input h-[52px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
            placeholder="Asunto de tu mensaje"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-lg font-semibold text-gray-300 mb-2">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="input h-[68px] text-[15px] text-white/60 w-full bg-gray-900 text-gray-50 px-3 py-1 rounded-lg border border-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
            placeholder="Tu mensaje"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-purple-600 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-full border text-left p-4 text-purple-300 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-purple-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </section>
  )
}

