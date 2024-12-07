"use client";

import { useState } from "react";
import Cookies from "js-cookie";

export default function CommentInput({ userId }: { userId: string | null }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newComment }),
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized: Invalid or expired token");
        }
        throw new Error("Failed to create comment");
      }
      const data = await response.json();
      console.log(data);

      setNewComment("");
      // Optionally, you can call a function to refresh the comments list here
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {userId && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className="w-full p-4 bg-gray-900 text-gray-50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-150 ease-in-out"
            rows={4}
          />
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Enviar comentario
          </button>
        </form>
      )}
    </div>
  );
}
