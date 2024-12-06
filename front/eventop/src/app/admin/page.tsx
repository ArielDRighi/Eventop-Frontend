import DashboardAdminSection from "@/components/DashboardAdminSection";

const AdminPage = () => {
  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <DashboardAdminSection />
      </div>
    </div>
  );
};

export default AdminPage;
