const APIURL = process.env.NEXT_PUBLIC_API_URL;
import { IUserEdit } from "../interfaces/IUser";
import { IDataBan } from "../interfaces/IDataBan";

export const getAllUsers = async (token: string, page: number, limit: number) => {
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

export const getUserById = async (token: string, id: any) => {
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

export const updateUserImage = async (token: string, id: string, image: File | null) => {
  try {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }

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

export const updateUserProfile = async (token: string, id: string, data: IUserEdit) => {
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
  data: { oldPassword: string; newPassword: string }
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

export const banUser = async (token: string, id: number, data: IDataBan) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/ban`, {
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
    console.log("Error en useBanUser:", error);
    throw error;
  }
};

export const activeUser = async (token: string, id: number) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/unban`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Error en useActiveUser:", error);
    throw error;
  }
};

export const changeUserRole = async (token: string, id: number, data: { role: string }) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/role`, {
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
    console.log("Error en useChangeUserRole:", error);
    throw error;
  }
};

// export const sendEmail = async (token: string, id: number, data: { subject: string, message: string }) => {
//   try {
//     const response = await fetch(`${APIURL}/users/${id}/send-email`, {
//       method: "POST",
