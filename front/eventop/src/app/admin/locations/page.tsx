"use client";

import React, { useState, useEffect } from "react";
import {
  useGetAllLocations,
  useDeleteLocation,
} from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import CreateLocation from "@/components/CreateLocation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {Loader} from "lucide-react";

const LocationsPage = () => {
  const { result, loading, error } = useGetAllLocations();
  const { deleteLocation } = useDeleteLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<ILocation[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (result) {
      setLocations(result);
    }
  }, [result]);

  const filteredLocations = locations?.filter((location) =>
    location.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteLocation = async (location: ILocation) => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    try {
      const res = await deleteLocation(location.locationId, token);
      if (res === undefined) {
        setLocations(
          locations.filter((loc) => loc.locationId !== location.locationId)
        );
        Swal.fire({
          title: "Success",
          text: "Location deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
      <Loader className="w-16 h-16 text-purple-500 animate-spin" />
    </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container bg-gradient-to-br from-gray-900 to-gray-900 text-white mx-auto p-4">
      <h1 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">Locaciones</h1>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-4 pl-12 bg-gray-900 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 group-hover:border-purple-500"
      />
      <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden mb-12 transform hover:scale-102 transition duration-300 mt-2">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-600">
              <th className="py-4 px-6  text-sm font-semibold uppercase tracking-wider text-center">ID</th>
              <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider ">Ciudad</th>
              <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Provincia</th>
              <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Pais</th>
              <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Direccion</th>
              <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations?.map((location) => (
              <tr key={location.locationId}>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  {location.locationId}
                </td>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  {location.city}
                </td>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  {location.state}
                </td>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  {location.country}
                </td>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  {location.address}
                </td>
                <td className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300 text-center">
                  <button
                    onClick={() => handleDeleteLocation(location)}
                    className="group relative inline-flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                  >
                    <svg
                        viewBox="0 0 1.625 1.625"
                        className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                        height="15"
                        width="15"
                      >
                        <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                        <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                        <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                      </svg>

                      <svg
                        width="16"
                        fill="none"
                        viewBox="0 0 39 7"
                        className="origin-right duration-500 group-hover:rotate-90"
                      >
                        <line
                          strokeWidth="4"
                          stroke="white"
                          y2="5"
                          x2="39"
                          y1="5"
                        ></line>
                        <line
                          strokeWidth="3"
                          stroke="white"
                          y2="1.5"
                          x2="26.0357"
                          y1="1.5"
                          x1="12"
                        ></line>
                      </svg>
                       {/* Contenedor del ícono */}
                       <svg width="16" fill="none" viewBox="0 0 33 39">
                        <mask fill="white" id="path-1-inside-1_8_19">
                          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                        </mask>
                        <path
                          mask="url(#path-1-inside-1_8_19)"
                          fill="white"
                          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                        ></path>
                        <path
                          strokeWidth="4"
                          stroke="white"
                          d="M12 6L12 29"
                        ></path>
                        <path
                          strokeWidth="4"
                          stroke="white"
                          d="M21 6V29"
                        ></path>
                      </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <CreateLocation setLocations={setLocations} />
      </div>
    </div>
  );
};

export default LocationsPage;
