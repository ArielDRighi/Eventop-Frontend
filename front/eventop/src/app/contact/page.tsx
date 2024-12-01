import { Metadata } from 'next'
import SupportHeader from '../../components/contact/SupportHeader'
import FAQSection from '../../components/contact/FAQSection'
import QuickSolutions from '../../components/contact/QuickSolutions'
import ContactInfo from '../../components/contact/ContactInfo'
import ContactForm from '../../components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Soporte y Contacto | Sistema de Tickets',
  description: 'Encuentra respuestas a preguntas frecuentes, soluciones rápidas y formas de contactarnos.',
}

export default function SupportPage() {
  return (
    <div className='bg-gray-900 mt-10 '>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SupportHeader />
      <div className="space-y-12 bg-gradient-to-br from-gray-900 to-gray-900 text-gray-100 p-8 border border-gray-900 rounded-xl shadow-2xl">
        <FAQSection />
        <QuickSolutions />
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
    </div>
  )
}

