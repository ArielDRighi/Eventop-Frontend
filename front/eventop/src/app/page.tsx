"use client";
import SectionOne from "../components/SectionOne";
import Cards from "@/components/Cards";
import Blog from "@/components/Blog";
import BlogTwo from "@/components/BlogTwo";
import Opinions from "@/components/Opinions";
import Comments from "@/components/Coments";
import { useUserContext } from "@/context/userContext";

const Home = () => {
  const { userId } = useUserContext();

  return (
    <div className="bg-gray-900">
      <SectionOne />
      <Cards />
      <BlogTwo />
      <Opinions />
      {userId && <Comments userId={userId} />}
      <Blog />
    </div>
  );
};

export default Home;
