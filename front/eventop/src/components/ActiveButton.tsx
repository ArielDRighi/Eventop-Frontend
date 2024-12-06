import React from "react";
import { activeUser } from "@/helpers/users.helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface SuspendButtonProps {
  userId: number;
  onUpdate: () => void;
}

const SuspendButton: React.FC<SuspendButtonProps> = ({ userId, onUpdate }) => {

  const handleClick = async () => {
    // Logic to suspend the user
    const token = Cookies.get("accessToken") || "null";
    const parsedToken = JSON.parse(token);
  
    try {
      const res = await activeUser(parsedToken, userId);
      console.log("banUser response:", res);
      Swal.fire({
        icon: "success",
        title: "Usuario re activado",
        showConfirmButton: false,
        timer: 1500,
      });
      onUpdate();

    } catch (error) {
      console.log("Error en banUser:", error);
    }
  };


  return (
    <div>
      <button 
      className="group font-mono text-sm group-hover:before:duration-500 
      group-hover:after:duration-500 after:duration-500 hover:border-green-500 
      hover:before:[box-shadow:_20px_20px_20px_30px_#008f7a] duration-500 before:duration-500 
      hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12
       hover:before:-bottom-8 hover:before:green hover:underline hover:underline-offset-4 
        origin-left hover:decoration-2 hover:text-gray-50 relative bg-gray-900 h-10 w-30 
        border text-left p-3 text-gray-50  font-bold rounded-lg  overflow-hidden 
         before:absolute before:w-12 before:h-12 before:content[''] before:right-1 
         before:top-1 before:z-10 before:rounded-full before:blur-lg  
         after:absolute after:z-10 after:w-20 after:h-20 after:content[''] 
          after:bg-green-600 after:right-8 after:top-3 after:rounded-full after:blur-lg"
      onClick={handleClick}>
        Activar usuario
      </button>
    </div>
  );
};

export default SuspendButton;
