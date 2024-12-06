"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PaymentButton from "./PaymentButton";
import { texts } from "../helpers/texts";
import { currencies } from "../helpers/currencies";
import * as dotenv from "dotenv";
import { useParams } from "next/navigation";
import { useUserContext } from "../context/userContext";

dotenv.config({
  path: ".env",
});

type Language = "es" | "en" | "pt" | "fr";
type Currency = "USD" | "EUR" | "ARS" | "BRL";

export default function Payments() {
  const { userName } = useUserContext();
  const [ticketCount, setTicketCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "credit_card" | "mercado_pago" | null
  >(null);
  const [isMercadoPagoSelected, setIsMercadoPagoSelected] = useState(false);
  const [language, setLanguage] = useState<Language>("es");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const params = useParams();
  const [quantityAvailable, setQuantityAvailable] = useState<number | null>(
    null
  );

  const eventId = params.eventId as string;
  const email = userName;
  const quantity = ticketCount;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del evento");
        }
        const data = await response.json();
        setBasePrice(data.price);
        setQuantityAvailable(data.quantityAvailable);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const newTotal = ticketCount * basePrice * currencies[currency].rate;
    setTotal(Number(newTotal.toFixed(2)));
  }, [ticketCount, currency, basePrice]);

  useEffect(() => {
    const createPreference = async () => {
      if (!isMercadoPagoSelected) {
        setPreferenceId(null);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/create_preference`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, email, quantity }),
          }
        );

        if (!response.ok) {
          const errorMessage =
            response.status === 404
              ? "Error 404: URL no encontrada - /payment/create_preference"
              : response.status === 500
              ? "Error 500: Error interno del servidor"
              : `Error inesperado: ${response.status}`;

          console.error(errorMessage);
          return;
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPreference();
  }, [isMercadoPagoSelected, total, eventId, email, quantity]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTicketCount = parseInt(e.target.value);
    setTicketCount(newTicketCount);

    // Si MercadoPago está seleccionado, actualiza la preferencia
    if (isMercadoPagoSelected) {
      setIsMercadoPagoSelected(false);
      setTimeout(() => setIsMercadoPagoSelected(true), 0);
    }
  };

  const handlePaymentMethodChange = () => {
    setIsMercadoPagoSelected(!isMercadoPagoSelected);
    setPaymentMethod(isMercadoPagoSelected ? null : "mercado_pago");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "mercado_pago") {
      console.log("MercadoPago payment method selected");
    }
  };

  const t = texts[language];
  const currencySymbol = currencies[currency].symbol;

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white text-gray-900 shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">{t.description}</p>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">
          Tickets disponibles: {quantityAvailable}
        </p>
      </motion.div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-semibold mb-2"
            >
              {t.selectLanguage}
            </label>
            <select
              id="language"
              onChange={(e) => setLanguage(e.target.value as Language)}
              value={language}
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-semibold mb-2"
            >
              {t.selectCurrency}
            </label>
            <select
              id="currency"
              onChange={(e) => setCurrency(e.target.value as Currency)}
              value={currency}
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="ARS">ARS (ARS$)</option>
              <option value="BRL">BRL (R$)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="tickets"
              className="block text-sm font-semibold mb-2"
            >
              {t.tickets}
            </label>
            <select
              id="tickets"
              onChange={handleTicketChange}
              value={ticketCount}
              className="w-full px-3 py-2 border border-purple-500 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <span className="block text-sm font-semibold mb-3">
            {t.paymentMethod}
          </span>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                id="mercado_pago"
                checked={isMercadoPagoSelected}
                onChange={handlePaymentMethodChange}
                className="form-checkbox h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm">{t.mercadoPago}</span>
            </label>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <h3 className="font-semibold mb-2">{t.orderSummary}</h3>
          <p>
            {t.tickets}: {ticketCount}
          </p>
          <p className="text-xl font-bold mt-2">
            {t.total}: {currencySymbol}
            {total}
          </p>
        </motion.div>

        <div className="flex justify-center pt-6">
          {isMercadoPagoSelected && preferenceId ? (
            <PaymentButton preferenceId={preferenceId} />
          ) : (
            <p>Seleccionar método de pago</p>
          )}
        </div>
      </form>
    </div>
  );
}
