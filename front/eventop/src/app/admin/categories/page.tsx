"use client";

import React, { useState, useEffect } from "react";
import {
  useGetAllCategories,
  useCreateCategory,
  useDeleteCategory,
} from "@/helpers/categories.helpers";
import { ICategory } from "@/interfaces/ICategory";
import Cookies from "js-cookie";
import { Search, Plus, Loader, AlertCircle, CheckCircle } from "lucide-react";

const CategoriesPage = () => {
  const { result, loading, error } = useGetAllCategories();
  const { createCategory } = useCreateCategory();
  const { deleteCategory } = useDeleteCategory();
  const [newCategory, setNewCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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
      const res = await createCategory(newCategory, token);
      setNewCategory("");
      if (res) {
        setCategory([...categories, res]);
        showNotification("success", "Categoría creada exitosamente");
      }
    } catch (error) {
      console.log(error);
      showNotification("error", "Error al crear la categoría");
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
        showNotification("success", "Categoría eliminada exitosamente");
      }
    } catch (error) {
      console.log(error);
      showNotification("error", "Error al eliminar la categoría");
    }
  };

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredCategories = categories?.filter((category) =>
    category.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader className="w-16 h-16 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <div className="text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
          Gestión de Categorías
        </h1>

        <div className="mb-8 relative group">
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-4 pl-12 bg-gray-900 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 group-hover:border-purple-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition duration-300" />
        </div>

        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden mb-12 transform hover:scale-102 transition duration-300">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-600">
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  ID
                </th>
                <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                  Nombre
                </th>
                <th className="py-4 px-6 text-right text-sm font-semibold uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories?.map((category, index) => (
                <tr
                  key={category.categoryId}
                  className="border-b  border-gray-700 hover:bg-gray-700 transition duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-6">{category.categoryId}</td>
                  <td className="py-4 px-6">{category.name}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDeleteCategory(category)}
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

        <div className="bg-gray-900 p-8 rounded-lg shadow-xl transform hover:scale-102 transition duration-300">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Crear Nueva Categoría
          </h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Nombre de la nueva categoría..."
              value={newCategory}
              onChange={handleNewCategoryChange}
              className="flex-grow p-4 bg-gray-900 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
            <button
              onClick={handleCreateCategory}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Plus className="w-6 h-6" />
              <span className="text-lg">Crear</span>
            </button>
          </div>
        </div>

        {notification && (
          <div
            className={`fixed bottom-8 right-8 p-4 rounded-lg shadow-lg flex items-center space-x-2 text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } animate-fade-in-up`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <span>{notification.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
