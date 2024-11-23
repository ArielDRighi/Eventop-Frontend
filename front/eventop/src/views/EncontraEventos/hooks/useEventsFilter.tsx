

import { ICategory } from "@/interfaces/ICategoty";
import { ILocation } from "@/interfaces/ILocations";
import { Search } from "lucide-react";

interface EventFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  priceFilter: string;
  setPriceFilter: (value: string) => void;
  categories: ICategory[];
  locations: ILocation[];
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  priceFilter,
  setPriceFilter,
  categories,
  locations,
}) => (
  <div className="bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-10">
    <h2 className="text-3xl font-bold mb-6 text-center">Filtrar Eventos</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="relative bg-gray-900">
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="w-full pl-12 pr-4 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-300" />
      </div>

      {["Categoría", "Ubicación"].map((label, index) => (
        <div key={label} className="relative">
          <select
            className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
            value={index === 0 ? selectedCategory : selectedLocation}
            onChange={(e) =>
              index === 0 ? setSelectedCategory(e.target.value) : setSelectedLocation(e.target.value)
            }
          >
            <option value="">{`Todas las ${label.toLowerCase()}s`}</option>
            {(index === 0 ? categories : locations).map((item: any) => (
              <option
                key={item[index === 0 ? "categoryId" : "locationId"]}
                value={item[index === 0 ? "categoryId" : "locationId"].toString()}
              >
                {index === 0 ? item.name : item.city}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="relative">
        <select
          className="w-full pl-4 pr-10 py-3 bg-gray-900 bg-opacity-50 border border-purple-500 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition duration-300"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">Todos los precios</option>
          <option value="0">Gratis</option>
          <option value="50">Hasta 50</option>
          <option value="100">Hasta 100</option>
          <option value="500">Hasta 500</option>
          <option value="1000">Hasta 1000</option>
        </select>
      </div>
    </div>
  </div>
);