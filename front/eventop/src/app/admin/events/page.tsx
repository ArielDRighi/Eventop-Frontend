
import GestionEventos from "@/views/GestionEventos/GestionEventos";

const EventsPage = () => {
    return (
      <section className="flex flex-col gap-2">
      <div>
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Gestión de Eventos
        </h1>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        <GestionEventos />
      </div>
    </section>
  );
};

export default EventsPage;
