"use client";

import React, { useState, useEffect } from "react";
import PaymentButton from "./PaymentButton";

const App: React.FC = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  const eventId = 1; // Reemplaza con el ID del evento que deseas pagar

  useEffect(() => {
    const createPreference = async () => {
      console.log("ID de evento:", eventId);
      // Verificar el valor de la URL de la API
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      try {
        console.log("Bloque try");

        const response: Response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/create_preference`, // preferencia de pago
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId }),
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            console.error(
              "Error 404: URL no encontrada - /payment/create_preference"
            );
          } else if (response.status === 500) {
            console.error("Error 500: Error interno del servidor");
          } else {
            console.error(`Error inesperado: ${response.status}`);
          }
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId); // identificador de preferencia de pago
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPreference();
  }, [eventId]);

  return (
    <div>
      {preferenceId ? (
        <PaymentButton preferenceId={preferenceId} />
      ) : (
        <p>
          Error al cargar la preferencia de pago. Por favor, intente nuevamente.
        </p>
      )}
    </div>
  );
};

export default App;
