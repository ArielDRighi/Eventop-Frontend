import { motion } from "framer-motion"
import { CreditCard, ShoppingCartIcon } from "lucide-react"
import { useState } from "react";

type PurchaseHistoryItem = {
    id: string;
    eventName: string;
    date: string;
    quantity: number;
    total: number;
  };
  

export const Compras = () => { 

    const [showHistory, setShowHistory] = useState(false);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);

    return ( 




        <div className="mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center text-purple-600 hover:text-purple-800"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            {showHistory ? 'Ocultar Historial de Compras' : 'Ver Historial de Compras'}
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Compras</h2>
                {purchaseHistory.length === 0 ? (
                  <p className="text-gray-500">No hay compras previas.</p>
                ) : (
                  purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="border-b border-gray-200 py-4 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{purchase.eventName}</h3>
                          <p className="text-sm text-gray-500">Fecha: {new Date(purchase.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-500">Cantidad: {purchase.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-lg font-medium text-gray-900">${purchase.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
    )

}