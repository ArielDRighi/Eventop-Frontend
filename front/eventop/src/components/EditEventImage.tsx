import React, { useState } from 'react';
import { Pencil } from "lucide-react";
import { useChangeImage } from "@/helpers/events.helper";
import Cookies from "js-cookie";

interface EditEventImageProps {

  changeImage: React.Dispatch<React.SetStateAction<string | null>>;

  id: number;

}


const EditEventImage: React.FC<EditEventImageProps> = ({ changeImage, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedImage(file);
  };

  const handleSubmitImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = JSON.parse(Cookies.get("accessToken") || "null");
    if (!selectedImage) {
      console.error("No image selected");
      return;
    }
    try {
      const res = await useChangeImage(Number(id), selectedImage, token);
      console.log(res);
      changeImage(URL.createObjectURL(selectedImage));
      closeModal();
    } catch (error) {
      console.error("Failed to change image:", error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="group hover:before:duration-500 hover:after:duration-500 after:duration-500
         hover:border-green-500 hover:before:[box-shadow:_20px_20px_20px_30px_##40735D] duration-500 before:duration-500 
         hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 hover:text-white relative bg-gray-900 
         h-12 w-full sm:w-48 border text-center p-2 mt-4 mx-auto text-white font-bold rounded-lg overflow-hidden before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-green-400 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-green-500 after:right-8 after:top-3 after:rounded-full after:blur-lg"
      >
        Cambiar Imagen <Pencil className="inline mb-1"/>
      </button>
      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <form onSubmit={handleSubmitImage} className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <span
              className="absolute top-2 right-2 text-gray-500 cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <h2 className="text-xl font-bold mb-4 text-white">
              Cambiar Imagen
            </h2>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-2"
              onChange={handleImageChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Guardar
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600 transition duration-300"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditEventImage;