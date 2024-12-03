"use client";

// Formulario para crear una nueva locación
import React, { useState } from "react";
import { ILocationCreate, ILocation } from "@/interfaces/ILocations";
import { useCreateLocation } from "@/helpers/location.helper";
import Cookies from "js-cookie";

interface CreateLocationProps {

  setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>;

}

const CreateLocation: React.FC<CreateLocationProps> = ({ setLocations }) => {
  const [location, setLocation] = useState<ILocationCreate>({
    city: "",
    state: "",
    country: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });
  const { createLocation, loading, error } = useCreateLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = JSON.parse(Cookies.get("accessToken") || "null");
    console.log(location);
    try {
      const res = await createLocation(location, token);
      if (res) {
        setLocations((prevLocations) => [...prevLocations, res]);
        setLocation({
          city: "",
          state: "",
          country: "",
          address: "",
          latitude: 0,
          longitude: 0,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl text-center"
    >
      <h2 className="text-3xl font-bold text-purple-500 text-center mb-8">
        Crear Ubicación
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Estado
          </label>
          <input
            type="text"
            name="state"
            value={location.state}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            País
          </label>
          <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            value={location.address}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Latitud
          </label>
          <input
            type="number"
            name="latitude"
            value={location.latitude}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Longitud
          </label>
          <input
            type="number"
            name="longitude"
            value={location.longitude}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-700 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
      >
        {loading ? "Loading..." : "Crear Ubicación"}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

export default CreateLocation;
