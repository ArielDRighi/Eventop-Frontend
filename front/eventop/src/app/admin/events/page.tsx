import CreateEvent from "@/components/CreateEvent";
import SideBar from "@/components/SideBar";
import GestionEventos from "@/views/GestionEventos/GestionEventos";
// import Search from "../../../components/Search";

const EventsPage = () => {
    return (
      <section className="flex flex-col gap-2">
        <SideBar/>
      <div>
        <h1 className="text-3xl font-semibold text-slate-200 text-center mb-4">Gestión de Eventos</h1>
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
      <GestionEventos/>
      </div>
      </section>
    );
  }
  
  export default EventsPage;