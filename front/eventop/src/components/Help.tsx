'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { arrayHelp } from '@/helpers/arrayHelp';

export default function Help() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* FAQ Section */}
        <section className="bg-purple-500 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {arrayHelp.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
                  >
                    {expandedItem === item.id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                {expandedItem === item.id && (
                  <ul className="mt-2 space-y-2 text-gray-100">
                    {item.steps.map((step, index) => (
                      <li key={index} className="text-gray-100">
                        - {step}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
