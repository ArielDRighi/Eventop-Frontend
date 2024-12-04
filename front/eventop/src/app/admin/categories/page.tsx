"use client";

import React, { useState, useEffect } from "react";
import {
  useGetAllCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/helpers/categories.helpers";
import { ICategory } from "@/interfaces/ICategory";
import Cookies from "js-cookie";

const CategoriesPage = () => {
  const { result, loading, error } = useGetAllCategories();
  const { createCategory } = useCreateCategory();
  const { deleteCategory } = useDeleteCategory();
  const [newCategory, setNewCategory] = useState<string>(""); // Cambiado a string
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    if (result) {
      setCategory(result);
    }
  }, [result]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleCreateCategory = async () => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    try {
      const res = await createCategory(newCategory, token); // Pasar el objeto correcto
      console.log(res);
      setNewCategory("");
      if (res) {
        setCategory([...categories, res]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (category: ICategory) => {
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    try {
      const res = await deleteCategory(category.categoryId, token);
      if (res) {
        setCategory(
          categories.filter((cat) => cat.categoryId !== category.categoryId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCategories = categories?.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-slate-200 text-3xl text-center">Loading...</div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4 text-purple-500">Categorias</h1>
      <input
        type="text"
        placeholder="Buscar categorias..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg overflow-scroll">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-700">ID</th>
              <th className="py-2 px-4 border-b border-gray-700">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-700">Accion</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories?.map((category) => (
              <tr key={category.categoryId}>
                <td className="py-2 px-4 border-b border-gray-700">
                  {category.categoryId}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  {category.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-700">
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <input
          type="text"
          placeholder="Nombre de la nueva categoria..."
          value={newCategory}
          onChange={handleNewCategoryChange}
          className="mb-4 p-2 border border-gray-300 rounded bg-gray-800 text-white focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Crear categoria
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
