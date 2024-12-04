import { useEffect, useState } from "react";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const useGetAllCategories = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${APIURL}/categories`, {
          method: "GET",
        });
        const data = await res.json();
        setResult(data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    })();
  }, []);

  return { result, loading, error };
};

export const useCreateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createCategory = async (category: string, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/categories/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: category }),
      });
      const res = await response.json();
      if (res.statusCode === 401) {
        setLoading(false);
        throw new Error(res.message);
      }
      if (res.statusCode === 400) {
        setLoading(false);
        throw new Error(res.message);
      } else {
        return res;
        setLoading(false);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return { createCategory, loading, error };
};

export const useDeleteCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteCategory = async (id: number, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();

      if (res.statusCode === 401) {
        setLoading(false);
        throw new Error(res.message);
      }
      if (res.statusCode === 400) {
        setLoading(false);
        throw new Error(res.message);
      } else {
        return res;
        setLoading(false);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  return { deleteCategory, loading, error };
};
