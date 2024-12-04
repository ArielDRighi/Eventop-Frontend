import DashboardClientSection from "@/views/UserDashboardClient/DashboardClientSection";

const ClientPage = () => {
  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <div className="p-6 justify-center text-center">
          <h1 className="text-3xl font-semibold">Tus Evento</h1>
        </div>
        <DashboardClientSection />
      </div>
    </div>
  );
};

export default ClientPage;
