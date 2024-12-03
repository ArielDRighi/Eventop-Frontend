const APIURL = process.env.NEXT_PUBLIC_API_URL;
import { IUserProfile } from "../interfaces/IUser";

export const useGetAllUsers = async (token: string, page:number, limit:number) => {
  try {
    const response = await fetch(`${APIURL}/users?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en useGetAllUsers:", error);
    throw error;
  }
};

export const getUserById = async (token: string, id: string) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en useGetUserById:", error);
    throw error;
  }
};

export const updateUserImage = async (
  token: string,
  id: string,
  image: File | null
) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${APIURL}/users/${id}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en updateUserImage:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  token: string,
  id: string,
  data: IUserProfile
) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en updateUserProfile:", error);
    throw error;
  }
};

export const changeUserPassword = async (
  token: string,
  id: string,
  data: { Oldpassword: string; newPassword: string }
) => {
  try {
    const response = await fetch(`${APIURL}/auth/${id}/change-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en changeUserPassword:", error);
    throw error;
  }
};

export const createUserPassword = async (
  token: string,
  id: string,
  data: { password: string; confirmPassword: string }
) => {
  try {
    const response = await fetch(`${APIURL}/auth/${id}/assign-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en createUserPassword:", error);
    throw error;
  }
};
// Removed local useState declaration to avoid conflict with imported useState from React

const useBanUser = async (token: string, id: string) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/ban`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en useBanUser:", error);
    throw error;
  }
}