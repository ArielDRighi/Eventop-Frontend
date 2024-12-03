import { useEffect, useState } from "react";
import { ILocation } from "@/interfaces/ILocations";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const useGetAllLocations = () => {
  const [result, setResult] = useState<ILocation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${APIURL}/locations`, {
          method: "GET"
        });
        const data = await res.json();
        setResult(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    })();
  }, []);

  return { result, loading, error };
};

export const useCreateLocation = () => {  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLocation = async (location: ILocation, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/locations/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(location),
      });
      console.log(response);
      const res = await response.json();
      console.log(res);
      if (res.statusCode === 201) {
        setLoading(false);
        return res;
      }
      if (res.statusCode === 401) {
        setLoading(false);
        throw new Error(res.message);
      }
      if (res.statusCode === 400) {
        setLoading(false);
        throw new Error(res.message);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { createLocation, loading, error };
}

// delete locations

export const useDeleteLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteLocation = async (locationId: number, token: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/locations/${locationId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const res = await response.json();
      console.log(res);
      if (res.statusCode === 204) {
        setLoading(false);
        return res;
      }
      if (res.statusCode === 401) {
        setLoading(false);
        throw new Error(res.message);
      }
      if (res.statusCode === 400) {
        setLoading(false);
        throw new Error(res.message);
      }
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { deleteLocation, loading, error };
}