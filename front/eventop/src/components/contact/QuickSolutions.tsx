import { Lightbulb } from 'lucide-react'

const solutions = [
  {
    title: "Reiniciar la aplicación",
    description: "Muchos problemas se pueden resolver simplemente cerrando y volviendo a abrir la aplicación."
  },
  {
    title: "Limpiar la caché",
    description: "Si experimentas problemas de rendimiento, intenta limpiar la caché de tu navegador."
  },
  {
    title: "Verificar la conexión",
    description: "Asegúrate de tener una conexión a internet estable antes de reportar problemas de carga."
  },
]

export default function QuickSolutions() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Soluciones Rápidas</h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {solutions.map((solution, index) => (
          <div key={index} className="flex items-start p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <Lightbulb className="h-6 w-6 text-purple-500 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-300">{solution.title}</h3>
              <p className="text-sm text-gray-400">{solution.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

