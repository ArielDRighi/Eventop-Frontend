import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useDeleteEvent } from "@/helpers/events.helper";

const handleDelete = async (eventId: number) => {
    const token = JSON.parse(Cookies.get("adminToken") || 'null')
    console.log(token)
  if (!token) {
    throw new Error("Token is not available");
  }
  try {
    const res = await useDeleteEvent(eventId, token);
    console.log(res);
  } catch (error) {
    console.error("Failed to delete event:", error);
  }
};

const DeleteButton: React.FC<{ eventId: number }> = ({ eventId }) => {
  const confirmDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(eventId);
      }
    });
  };

  return (
    <button
      onClick={confirmDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Eliminar Evento
    </button>
  );
};

export default DeleteButton;