import DashboardAdminSection from "@/components/DashboardAdminSection";

const AdminPage = () => {
  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <div className="p-6 justify-center text-center">
          <h1 className="text-3xl font-semibold">Panel de Administración</h1>
        </div>
        <DashboardAdminSection />
      </div>
    </div>
  );
};

export default AdminPage;
