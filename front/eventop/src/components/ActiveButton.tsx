import React from "react";
import { activeUser } from "@/helpers/users.helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface SuspendButtonProps {
  userId: number;
}

const SuspendButton: React.FC<SuspendButtonProps> = ({ userId }) => {

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

    } catch (error) {
      console.log("Error en banUser:", error);
    }
  };


  return (
    <div>
      <button className="btn bg-orange-200" onClick={handleClick}>
        Activar usuario
      </button>
    </div>
  );
};

export default SuspendButton;
