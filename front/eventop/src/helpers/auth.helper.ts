import { ILoginProps } from "@/interfaces/ILoginProps";
import { IRegisterProps } from "@/interfaces/IRegisterProps";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData: IRegisterProps) => {
  console.log(userData);
  try {
    const response = await fetch(`${APIURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const res = await response.json();
    if (res.statusCode === 400) {
      throw new Error(res.message);
    } else {
      return res;
    }
  } catch (error: any) { 
    throw new Error(error);
  }
};

export const login = async (userData: ILoginProps) => {
  try {
    const response = await fetch(`${APIURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const res = await response.json();
    console.log(res);
    if (response.status === 400) {
      Swal.fire({
        title: res.message,
        icon: "error",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false, // Necesario para desactivar los estilos por defecto de los botones
      });
      throw new Error(res.message);
    } else {
      return res;
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
