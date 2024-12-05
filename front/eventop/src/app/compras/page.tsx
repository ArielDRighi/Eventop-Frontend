"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart as ShoppingCartIcon, CreditCard } from "lucide-react";
// import { PurchaseHistoryItem } from "@/types"; // Assuming you have a type defined for PurchaseHistoryItem
import { useRouter } from "next/navigation";

interface IPurchaseHistoryItem {
    id: string;
    eventName: string;
    date: string;
    quantity: number;
    total: number;
}

const PurchaseHistoryPage = () => {
    const router = useRouter();
  const [purchaseHistory, setPurchaseHistory] = useState<IPurchaseHistoryItem[]>([
 // Example data, replace with actual data fetching logic
    {
      id: "1",
      eventName: "Summer Music Festival",
      date: "2023-07-15",
      quantity: 2,
      total: 199.98,
    },
    {
      id: "2",
      eventName: "Tech Conference 2023",
      date: "2023-08-20",
      quantity: 1,
      total: 299.99,
    },
  ]);

  return (
<div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Historial de Compras</h1>
        <div className="space-y-4">
          {purchaseHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">{item.eventName}</h2>
                  <p className="text-gray-400">{item.date}</p>
                  <p className="text-gray-400">Cantidad: {item.quantity}</p>
                  <p className="text-gray-400">Total: ${item.total.toFixed(2)}</p>
                </div>
                <CreditCard className="h-10 w-10 text-purple-500" />
              </div>
            </motion.div>
          ))}
        </div>
      <div className="mt-4 w-full">
        <button className="btn w-full text-center font-semibold" onClick={() => router.push("/events")}>
          Realizar otra compra
        </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;