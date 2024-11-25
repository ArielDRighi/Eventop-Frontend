const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useGetAllUsers = async (token: { access_token: string }) => {
  const { access_token } = token;
  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
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
