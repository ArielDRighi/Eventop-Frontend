"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentButton from "./PaymentButton";
import { texts } from "../helpers/texts";
import { currencies } from "../helpers/currencies";
import * as dotenv from "dotenv";
import { useParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

dotenv.config({
  path: ".env",
});

type Language = "es" | "en" | "pt" | "fr";
type Currency = "USD" | "EUR" | "ARS" | "BRL";

export default function Payments() {
  const { user } = useUser();
  const [ticketCount, setTicketCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0); // Inicialmente 0
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<
    "credit_card" | "mercado_pago"
  >("credit_card");
  const [language, setLanguage] = useState<Language>("es");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [savePaymentInfo, setSavePaymentInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const params = useParams();

  const eventId = params.eventId as string;
  const email = user?.email; // Usa el email del usuario logueado
  const quantity = ticketCount;
  console.log("ID del evento", eventId);
  console.log("Email del usuario", email);
  console.log("quantity", quantity);

  const [errors, setErrors] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCVC: false,
  });

  // Función para obtener los detalles del evento
  const fetchEventDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del evento");
      }
      const data = await response.json();
      setBasePrice(data.price); // Asume que el precio está en data.price
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  useEffect(() => {
    fetchEventDetails(); // Llama a la función para obtener los detalles del evento
  }, [eventId]);

  useEffect(() => {
    const newTotal = ticketCount * basePrice * currencies[currency].rate;
    setTotal(Number(newTotal.toFixed(2)));
  }, [ticketCount, currency, basePrice]);

  // efecto para crear la preferencia de pago
  useEffect(() => {
    const createPreference = async () => {
      if (paymentMethod !== "mercado_pago") return;
      console.log("ID de evento:", eventId, typeof eventId);
      console.log("email:", email);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/payment/create_preference`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ eventId, email, quantity }), // Incluir el correo electrónico en el cuerpo de la solicitud
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
  }, [paymentMethod, total, eventId, email]);

  const handleTicketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketCount(parseInt(e.target.value));
  };

  const validateForm = () => {
    const newErrors = {
      cardNumber: !/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, "")),
      cardExpiry: !/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(cardExpiry),
      cardCVC: !/^[0-9]{3,4}$/.test(cardCVC),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "credit_card") {
      if (validateForm()) {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          "Processing payment for",
          ticketCount,
          "tickets. Total:",
          total,
          currency,
          "Method:",
          paymentMethod
        );
        setIsProcessing(false);
      }
    } else if (paymentMethod === "mercado_pago") {
      // The MercadoPago button will handle the payment process
      console.log("MercadoPago payment method selected");
    }
  };

  const t = texts[language];
  const currencySymbol = currencies[currency].symbol;

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white text-gray-900 shadow-xl rounded-xl transition-all duration-300 ease-in-out hover:shadow-2xl sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 text-xs sm:text-sm mb-4">{t.description}</p>
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
                type="radio"
                id="credit_card"
                value="credit_card"
                checked={paymentMethod === "credit_card"}
                onChange={() => setPaymentMethod("credit_card")}
                className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm">{t.creditCard}</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                id="mercado_pago"
                value="mercado_pago"
                checked={paymentMethod === "mercado_pago"}
                onChange={() => setPaymentMethod("mercado_pago")}
                className="form-radio h-5 w-5 text-purple-600 transition duration-150 ease-in-out"
              />
              <span className="text-sm">{t.mercadoPago}</span>
            </label>
          </div>
        </div>

        <AnimatePresence>
          {paymentMethod === "credit_card" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div>
                <label
                  htmlFor="card"
                  className="block text-sm font-semibold mb-2"
                >
                  {t.cardNumber}
                </label>
                <input
                  id="card"
                  placeholder="1234 5678 9012 3456"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className={`w-full px-3 py-2 border ${
                    errors.cardNumber ? "border-red-500" : "border-purple-500"
                  } rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs mt-1">{t.invalidCard}</p>
                )}
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.expiry}
                  </label>
                  <input
                    id="expiry"
                    placeholder="MM/YY"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className={`w-full px-3 py-2 border ${
                      errors.cardExpiry ? "border-red-500" : "border-purple-500"
                    } rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                  />
                  {errors.cardExpiry && (
                    <p className="text-red-500 text-xs mt-1">
                      {t.invalidExpiry}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-semibold mb-2"
                  >
                    {t.cvc}
                  </label>
                  <input
                    id="cvc"
                    placeholder="123"
                    required
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value)}
                    className={`w-full px-3 py-2 border ${
                      errors.cardCVC ? "border-red-500" : "border-purple-500"
                    } rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white transition-colors duration-200 text-gray-800`}
                  />
                  {errors.cardCVC && (
                    <p className="text-red-500 text-xs mt-1">{t.invalidCVC}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="savePaymentInfo"
                  checked={savePaymentInfo}
                  onChange={(e) => setSavePaymentInfo(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-purple-600"
                />
                <label
                  htmlFor="savePaymentInfo"
                  className="ml-2 text-sm text-gray-700"
                >
                  {t.savePaymentInfo}
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
          {paymentMethod === "mercado_pago" && preferenceId ? (
            <PaymentButton preferenceId={preferenceId} />
          ) : (
            <button
              type="submit"
              disabled={isProcessing || paymentMethod === "mercado_pago"}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            >
              {isProcessing ? t.processing : t.pay}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
