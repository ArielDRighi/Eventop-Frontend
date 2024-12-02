"use client";

//formulario para crear una nueva locacion
import React, { useState } from 'react';
import { ILocation } from '@/interfaces/ILocations';
import { useCreateLocation } from '@/helpers/location.helper';

const CreateLocation = () => {
  const [location, setLocation] = useState<ILocation>({
    city: '',
    state: '',
    country: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const { createLocation, loading, error } = useCreateLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createLocation(location);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-purple-500 text-center mb-8">Crear Ubicación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">City</label>
          <input
            type="text"
            name="city"
            value={location.city}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">State</label>
          <input
            type="text"
            name="state"
            value={location.state}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Country</label>
          <input
            type="text"
            name="country"
            value={location.country}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Address</label>
          <input
            type="text"
            name="address"
            value={location.address}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Latitude</label>
          <input
            type="text"
            name="latitude"
            value={location.latitude}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Longitude</label>
          <input
            type="text"
            name="longitude"
            value={location.longitude}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded bg-gray-800 text-white"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
      >
        {loading ? 'Loading...' : 'Create Location'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default CreateLocation;