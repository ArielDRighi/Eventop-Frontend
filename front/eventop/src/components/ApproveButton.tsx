import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useApproveEvent } from "@/helpers/events.helper";

const handleApprove = async (eventId: number) => {
  const token = JSON.parse(Cookies.get("adminToken") || "null");
  console.log(token);
  if (!token) {
    throw new Error("Token is not available");
  }
  try {
    const res = await useApproveEvent(eventId, token);
    console.log(res);
  } catch (error) {
    console.error("Failed to approve event:", error);
  }
};

const ApproveButton: React.FC<{ eventId: number }> = ({ eventId }) => {
  const confirmApprove = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, aprobar evento",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleApprove(eventId);
      }
    });
  };

  return (
    <button
      onClick={confirmApprove}
      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Aprobar Evento
    </button>
  );
};

export default ApproveButton;