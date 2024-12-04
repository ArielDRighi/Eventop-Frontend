import { IEvent } from "@/interfaces/IEventos";
import { Calendar, DollarSign, Edit, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardEdit: React.FC<{ event: IEvent }> = ({ event }) => (
  <div
    key={`event-${event.eventId}`}
    className="bg-gray-900 bg-opacity-50 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
  >
    <div className="relative h-40">
      <Image
        className="w-full h-full object-cover transition-transform duration-500 transform hover:scale-110"
        src={
          event.imageUrl ||
          "https://i.pinimg.com/control2/736x/b4/42/77/b44277e3fa916b86b3b0bf49d9945f8b.jpg"
        }
        alt={event.name}
        objectFit="cover"
        width={500} // Añadir width
        height={300} // Añadir height
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
        <Link
          href={`/admin/events/edit-event/${event.eventId}`}
          className="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Editar <Edit className="h-5 w-5 ml-2 inline" />
        </Link>
      </div>
    </div>
    <div className="p-4 flex flex-col justify-between flex-grow">
      <h3 className="text-lg font-bold mb-2 text-white">{event.name}</h3>
      <div className="flex items-center text-gray-300 mb-1">
        <Calendar className="h-5 w-5 mr-2 text-purple-400" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center text-gray-300 mb-1">
        <MapPin className="h-5 w-5 mr-2 text-purple-400" />
        <span>{event.location_id.city}</span>
      </div>
      <div className="flex items-center text-gray-300">
        <DollarSign className="h-5 w-5 mr-2 text-purple-400" />
        <span>{event.price}</span>
      </div>
    </div>
  </div>
);

export default CardEdit;
