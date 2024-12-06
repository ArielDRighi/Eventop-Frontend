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
      className="group font-mono text-xl group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-green-500 hover:before:[box-shadow:_20px_20px_20px_30px_#008f7a] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:green hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-gray-50 relative bg-gray-900 h-16 w-48 border text-left p-3 text-gray-50  font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-green-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-green-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
    >
      Aprobar
    </button>
  );
};

export default ApproveButton;
