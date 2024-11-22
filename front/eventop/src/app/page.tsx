"use client";

import React, { useEffect, useState } from "react";
import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import EventsPassed from "@/components/EventsPassed";
import Opinions from "@/components/Opinions";
import PaymentButton from "@/components/PaymentButton";

const Home = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    const createPreference = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create_preference`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventId: 1, email: "test@example.com" }), // Incluye el campo email
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error al crear la preferencia de pago: ${errorMessage}`);
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPreference();
  }, []);

  return (
    <div className="bg-gray-900">
      <SectionOne />
      <Cards />
      <EventsPassed />
      <BlogTwo />
      <Opinions />
      <Blog />
      <div className="flex justify-center py-8">
        {preferenceId ? <PaymentButton preferenceId={preferenceId} /> : <p>Cargando botón de pago...</p>}
      </div>
    </div>
  );
};

export default Home;
