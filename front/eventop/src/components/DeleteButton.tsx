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
      className="group hover:before:duration-500 hover:after:duration-500 after:duration-500 hover:border-red-500 hover:before:[box-shadow:_20px_20px_20px_30px_#D04121] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-purple-300 relative bg-gray-900 h-16 w-full sm:w-48 border text-center p-3 text-purple-300 text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-red-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-orange-400 after:right-8 after:top-3 after:rounded-full after:blur-lg"
    >
      <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
    </button>
  );
};

export default DeleteButton;