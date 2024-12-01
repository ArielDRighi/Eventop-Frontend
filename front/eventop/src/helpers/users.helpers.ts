const APIURL = process.env.NEXT_PUBLIC_API_URL;


export const useGetAllUsers = async (token: string ) => {

  try {
    const response = await fetch(`${APIURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
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
}

export const updateUserImage = async (token: string, id: string, image: File | null) => {
   
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

}

// Removed local useState declaration to avoid conflict with imported useState from React

