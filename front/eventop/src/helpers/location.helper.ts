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