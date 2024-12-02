"use client";

import React, { useState } from "react";
import { useGetAllLocations } from "@/helpers/location.helper";
import { ILocation } from "@/interfaces/ILocations";
import CreateLocation from "@/components/CreateLocation";

const LocationsPage = () => {
  const { result, loading, error } = useGetAllLocations();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLocations = result?.filter((location) =>
    location.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Locations</h1>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations?.map((location) => (
              <tr key={location.locationId}>
                <td className="py-2 px-4 border-b">{location.id}</td>
                <td className="py-2 px-4 border-b">{location.name}</td>
                <td className="py-2 px-4 border-b">{location.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <CreateLocation />
      </div>
    </div>
  );
};

export default LocationsPage;