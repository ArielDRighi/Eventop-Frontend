"use client";

import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import EventsPassed from "@/components/EventsPassed";
import Opinions from "@/components/Opinions";
import { useEffect } from "react";

const Home = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google/login";
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("token", token);

    if (token) {
      localStorage.setItem("jwtToken", token);

      window.location.href = "http://localhost:3000";
    }
  }, []);

  return (
    <div className="bg-gray-900">
      <SectionOne />
      <Cards />
      <EventsPassed />
      <BlogTwo />
      <Opinions />
      <Blog />
      <div className="App">
        <button onClick={handleGoogleLogin}>Login With Google</button>
      </div>
    </div>
  );
};

export default Home;
