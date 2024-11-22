import { IEventsCreate } from "@/interfaces/IEventos";
import { IEvents } from "@/interfaces/IEventos";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const createEvent = async (data: IEventsCreate, token: any, image: File | null) => {
  try {
    const { access_token } = token;
    console.log(access_token);

    // Crear un FormData y agregar los datos y la imagen
    const formData = new FormData();
    formData.append('data', JSON.stringify(data)); // Agregar los datos como string
    if (image) {
      formData.append('image', image); // Agregar la imagen como archivo
    }
    const response = await fetch(`${APIURL}/events/create`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${access_token}`,
        // No se debe especificar "Content-Type" con FormData, ya que lo hace automáticamente
      },
      body: formData
    });
    const res = await response.json();
    if (res.message === "Evento creado exitosamente") {
      Swal.fire({
        title: "Evento creado",
        text: "Gracias por unirte a nosotros",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton:
            "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
    return res;
  } catch (error: any) {
    Swal.fire({
      title: "Error",
      text: error.message || "Hubo un problema al crear el evento. Por favor, inténtalo de nuevo.",
      icon: "error",
      customClass: {
        popup: "bg-white shadow-lg rounded-lg p-6",
        title: "text-2xl font-semibold text-gray-800",
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
    throw new Error(error.message || "Error al crear el evento");
  }
};

export const useGetAllEvents = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${APIURL}/events`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(
            `Error ${res.status}: No se pudo obtener los eventos`
          );
        }

        const data = await res.json();
        setResult(data);
      } catch (error: any) {
        setError(error.message || "Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { result, loading, error };
};

export const useEventById = (id: string | number) => {
  const [event, setEvent] = useState<IEvents | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError("Se requiere un ID de evento.");
        setLoading(false);
        return;
      }

      const numericId = Number(id);

      if (isNaN(numericId) || numericId <= 0) {
        setError("El ID del evento no es válido.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${APIURL}/events/${numericId}`);
        console.log(res);
        
        if (!res.ok) {
        
          if (res.status === 404) {
            throw new Error("Evento no encontrado");
          }
          throw new Error(`Error al obtener el evento: ${res.statusText}`);
        }
        const data: IEvents = await res.json();
        console.log('Evento obtenido:', data);
        
        setEvent(data);
      } catch (error) {
        console.log('Error en useEventById:', error);
        setError(error instanceof Error ? error.message : "Error desconocido al obtener el evento");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return { event, loading, error };
};