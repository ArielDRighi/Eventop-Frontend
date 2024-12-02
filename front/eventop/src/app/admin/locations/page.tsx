"use client";

import React, { useState, useEffect } from "react";
import { useGetAllLocations, useDeleteLocation } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import CreateLocation from "@/components/CreateLocation";
import Cookies from "js-cookie";

const LocationsPage = () => {
  const { result, loading, error } = useGetAllLocations();
  const { deleteLocation } = useDeleteLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<ILocation[]>([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  useEffect(() => {
    setLocations(result);
  }, [result]);

  const filteredLocations = locations?.filter((location) =>
    location.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteLocation = async (location: ILocation) => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    try {
      const res = await deleteLocation(location.locationId, token);
      if (res) {
        setLocations(locations.filter((loc) => loc.locationId !== location.locationId));
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-3xl text-slate-200 text-center">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-purple-500">Locations</h1>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-scroll">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-700">City</th>
              <th className="py-2 px-4 border-b border-gray-700">State</th>
              <th className="py-2 px-4 border-b border-gray-700">Country</th>
              <th className="py-2 px-4 border-b border-gray-700">Address</th>
              <th className="py-2 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations?.map((location) => (
              <tr key={location.locationId}>
                <td className="py-2 px-4 border-b border-gray-700">{location.locationId}</td>
                <td className="py-2 px-4 border-b border-gray-700">{location.city}</td>
                <td className="py-2 px-4 border-b border-gray-700">{location.state}</td>
                <td className="py-2 px-4 border-b border-gray-700">{location.country}</td>
                <td className="py-2 px-4 border-b border-gray-700">{location.address}</td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => handleDeleteLocation(location)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <CreateLocation setLocation={setLocations}/>
      </div>
    </div>
  );
};

export default LocationsPage;