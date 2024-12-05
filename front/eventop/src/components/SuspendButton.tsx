import React, { useState } from "react";
import { banUser } from "@/helpers/users.helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface SuspendButtonProps {
  userId: number;
}

const SuspendButton: React.FC<SuspendButtonProps> = ({ userId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isPermanent, setIsPermanent] = useState(false);
  const [reason, setReason] = useState("");

  const handleSuspendClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    // Logic to suspend the user
    console.log(
      `User ID: ${userId}, Permanent: ${isPermanent}, Reason: ${reason}`
    );
    const token = Cookies.get("accessToken") || "null";
    const parsedToken = JSON.parse(token);
    const data = {
      reason,
      permanent: isPermanent,
    };
    try {
      const res = await banUser(parsedToken, userId, data);
      console.log("banUser response:", res);
      Swal.fire({
        icon: "success",
        title: "Usuario suspendido",
        showConfirmButton: false,
        timer: 1500,
      });

      setShowPopup(false);
    } catch (error) {
      console.log("Error en banUser:", error);
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setReason("");
    setShowPopup(false);
  };

  return (
    <div>
      <button className="btn bg-orange-200" onClick={handleSuspendClick}>
        Suspender
      </button>
      {showPopup && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-300">
            <h2 className="font-bold text-lg">Suspender Usuario</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold">Permanente:</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={isPermanent}
                  onChange={(e) => setIsPermanent(e.target.checked)}
                />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-semibold">Razón:</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirmar
              </button>
              <button className="btn" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuspendButton;
