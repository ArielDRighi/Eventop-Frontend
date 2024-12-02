import React, { useState } from "react";
import {
  changeUserPassword,
  createUserPassword,
} from "@/helpers/users.helpers";
import Cookies from "js-cookie";

interface HandlePasswordProps {
  password: string;
  id: number | undefined;
}

const HandlePassword: React.FC<HandlePasswordProps> = ({ password, id }) => {
  const [newPassword, setNewPassword] = useState(password || "");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Handle password update logic here
      console.log("Password updated:", newPassword);
    } else {
      console.error("Passwords do not match");
    }
  };

  const handleSubmitPasswordChange = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const oldPassword = (
      form.elements.namedItem("oldPassword") as HTMLInputElement
    ).value;
    const newPassword = (
      form.elements.namedItem("newPassword") as HTMLInputElement
    ).value;

    const dataPassword = {
      oldPassword,
      newPassword,
    };
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log("Datos enviados:", dataPassword);
    try {
      const res = await changeUserPassword(token, id, dataPassword);
      console.log("Contraseña cambiada:", res);
    } catch (error) {
      console.log("Error al cambiar la contraseña:", error);
    }
  };

  const handleCreatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const dataPassword = {
      password,
      confirmPassword: password,
    };
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log("Datos enviados:", dataPassword);
    try {
      const res = await createUserPassword(token, id, dataPassword);
      console.log("Contraseña creada:", res);
    } catch (error) {
      console.log("Error al crear la contraseña:", error);
    }
  };

  return (
    <>
      {password === "" ? (
        <form onSubmit={handleCreatePassword}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              name="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button type="submit">Crear contraseña</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitPasswordChange}>
          <div>
            <label htmlFor="oldPassword">Current Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Cambiar contraseña</button>
        </form>
      )}
    </>
  );
};

export default HandlePassword;
