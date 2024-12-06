"use client";
import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import EventsPassed from "@/components/EventsPassed";
import Opinions from "@/components/Opinions";

const Home = () => {
  return (
    <div className="bg-gray-900">
      <SectionOne />
      <Cards />
      {/* <EventsPassed /> */}
      <BlogTwo />
      <Opinions />
      <Blog />
    </div>
  );
};

export default Home;
