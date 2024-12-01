import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactInfo() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Información de Contacto</h2>
      <div className="space-y-6 max-w-md mx-auto text-center">
  <div className="flex items-center justify-center space-x-3">
    <Mail className="h-6 w-6 text-purple-500" />
    <div className="flex items-center">
      
      <p className="text-sm text-gray-400">Eventop@gmail..com</p>
    </div>
  </div>
  <div className="flex items-center justify-center space-x-3">
    <Phone className="h-6 w-6 text-purple-500" />
    <div className="flex items-center">
      
      <p className="text-sm text-gray-400">+1 (555) 123-4567</p>
    </div>
  </div>
  <div className="flex items-center justify-center space-x-3">
    <MapPin className="h-6 w-6 text-purple-500" />
    <div className="flex items-center">
      
      <p className="text-sm text-gray-400"> 123 Calle Principal, San Juan, Argentina</p>
    </div>
  </div>
</div>
    </section>
  )
}

