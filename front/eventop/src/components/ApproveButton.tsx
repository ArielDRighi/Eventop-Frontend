import React from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { approveEvent } from "@/helpers/events.helper";
import { useRouter } from "next/navigation";

const ApproveButton: React.FC<{ eventId: number }> = ({ eventId }) => {
  const router = useRouter();
  const handleApprove = async (eventId: number) => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    if (!token) {
      throw new Error("Token is not available");
    }
    try {
      const res = await approveEvent(eventId, token);
      if (res) {
        router.push("/admin/events");
      }
    } catch (error) {
      console.error("Failed to approve event:", error);
    }
  };

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
      className="group hover:before:duration-500 hover:after:duration-500 after:duration-500 hover:border-green-500 hover:before:[box-shadow:_20px_20px_20px_30px_##40735D] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-white relative bg-gray-900 h-16 w-full sm:w-48 border text-center p-3 text-white text-base font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-green-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-green-500 after:right-8 after:top-3 after:rounded-full after:blur-lg"
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
        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
    </button>
  );
};

export default ApproveButton;
