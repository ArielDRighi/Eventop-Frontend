"use client"
import { useEffect, useState } from 'react';
import DashboardAdminSection from "@/components/DashboardAdminSection";
import SideBar from '@/components/SideBar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false); // Para indicar que la autenticación ha sido verificada

  useEffect(() => {
    const admin = Cookies.get("adminToken");
    if (admin) {
      setIsAdmin(true);
    }
    setCheckedAuth(true); // Indica que se ha verificado la autenticación
  }, []);

  const router = useRouter();

  // Muestra el componente de login si el usuario no es admin y ya se verificó la autenticación
  if (checkedAuth && !isAdmin) {
    router.push("/");
  }

  // Muestra un loader mientras se verifica la autenticación (opcional)
  if (!checkedAuth) {
    return <p>Verificando autenticación...</p>; // Puedes reemplazar esto con un componente de carga si lo prefieres
  }

  return (
    <div className="flex mt-10 bg-gray-900 h-screen">
      <div className="flex flex-col flex-grow">
        <SideBar/>
        <div className="p-6 justify-center text-center">
          <h1 className="text-3xl font-semibold">Panel de Administración</h1>
        </div>
        <DashboardAdminSection />
      </div>
    </div>
  );
};

export default AdminPage;

