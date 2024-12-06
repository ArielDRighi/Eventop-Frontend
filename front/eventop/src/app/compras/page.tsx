"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import { getUserById } from "@/helpers/users.helpers";
import Cookies from "js-cookie";

interface IEvent {
  eventId: number;
  name: string;
  description: string;
  date: string;
  time: string;
}

interface IPurchaseHistoryItem {
  ticketId: number;
  preferenceId: string;
  quantity: number;
  price: string;
  event: IEvent;
}

const PurchaseHistoryPage = () => {
  const router = useRouter();
  const { userId } = useUserContext();

  const [purchaseHistory, setPurchaseHistory] = useState<
    IPurchaseHistoryItem[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("accessToken") || "null";

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const parsedToken = JSON.parse(token);
        if (typeof parsedToken !== "string") {
          throw new Error("Invalid token format");
        }
        const res = await getUserById(parsedToken, userId);
        console.log(typeof userId);

        console.log(res);

        setPurchaseHistory(res.tickets || []); // Asumiendo que los tickets están en la propiedad `tickets`
      } catch (error: any) {
        console.error("Error fetching purchase history:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, [token, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-violet-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Historial de Compras
        </h1>
        <div className="space-y-4">
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map((item) => (
              <motion.div
                key={item.ticketId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {item.event.name}
                    </h2>
                    <p className="text-gray-400">{item.event.date}</p>
                    <p className="text-gray-400">Cantidad: {item.quantity}</p>
                    <p className="text-gray-400">Precio: ${item.price}</p>
                  </div>
                  <CreditCard className="h-10 w-10 text-purple-500" />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400">No tienes compras realizadas.</p>
          )}
        </div>
        <div className="mt-4 w-full">
          <button
            className="btn w-full text-center font-semibold"
            onClick={() => router.push("/events")}
          >
            Realizar otra compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;
