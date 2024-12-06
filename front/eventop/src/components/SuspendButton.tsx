import React, { useEffect, useState } from "react";
import { banUser } from "@/helpers/users.helpers";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface SuspendButtonProps {
  userId: number;
  onUpdate: () => void;
}

const SuspendButton: React.FC<SuspendButtonProps> = ({ userId, onUpdate }) => {
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
      onUpdate();
    } catch (error) {
      console.log("Error en banUser:", error);
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setReason("");
    setShowPopup(false);
  };

  useEffect(() => {
    setReason("Incumpliste las reglas de la comunidad.....");
  }, []);

  return (
    <div>
      <button 
      className="group font-mono text-sm
      group-hover:before:duration-500  
      group-hover:after:duration-500 after:duration-500
       hover:border-red-500 hover:before:[box-shadow:_10px_10px_10px_35px_#ff9671] 
       duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 
       hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  
       origin-left hover:decoration-2 hover:text-gray-50 relative bg-gray-900 h-10 w-30 border text-left p-2
        text-gray-50  font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] 
        before:right-1 before:top-1 before:z-10  before:rounded-full before:blur-lg  after:absolute 
        after:z-10 after:w-20 after:h-20 after:content['']  after:bg-red-500 after:right-8 after:top-3 after:rounded-full 
        after:blur-lg"
      onClick={handleSuspendClick}>
        Suspender
      </button>
      {showPopup && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-800">
            <h2 className="font-bold text-xl text-slate-200">Suspender Usuario</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-semibold text-slate-200">Permanente:</span>
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
                <span className="label-text font-semibold text-slate-200">Razón:</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-action">
              <button className="btn bg-purple-600 hover:bg-purple-500" onClick={handleConfirm}>
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
