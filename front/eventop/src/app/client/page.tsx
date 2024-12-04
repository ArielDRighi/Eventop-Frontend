import DashboardClientSection from "@/views/UserDashboardClient/DashboardClientSection";

const ClientPage = () => {
  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <div className="p-6 justify-center text-center">
          <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">Tus Eventos</h1>
        </div>
        <DashboardClientSection />
      </div>
    </div>
  );
};

export default ClientPage;
