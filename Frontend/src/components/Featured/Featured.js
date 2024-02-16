import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardFlex from "../Cards/CardFlex";

const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array.from({ length: listsToRender }, (_, index) => (
        <div key={index} className="flex max-[769px]:m-5 m-5 max-[426px]:w-3/4">
          <Skeleton
            variant="rect"
            className="me-5 h-full"
            width={200}
            height={200}
          />
          <div>
            <Skeleton
              variant="text"
              height={20}
              width={300}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              variant="text"
              height={20}
              width={300}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              variant="text"
              height={10}
              width={300}
              style={{ marginTop: 15 }}
            />
            <Skeleton variant="text" height={10} width={300} />
          </div>
        </div>
      ))}
    </>
  );
};

function Featured({ category }) {
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchFeatured() {
    try {
      const response = await fetch("https://royal-tech-blog.onrender.com/blogs/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.length > 1) {
        const featuredBlogs = data.filter(
          (blog) => blog.type === "featured" && blog.category === category
        );
        setFeaturedData(featuredBlogs);
      } else {
        const featuredBlogs = data.blogs.filter(
          (blog) => blog.type === "featured" && blog.category === category
        );
        setFeaturedData(featuredBlogs);
      }

      setLoading(false);
      setError("");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("something went wrong please try again later.");
    }
  }

  useEffect(() => {
    fetchFeatured();
  }, []);

  return (
    <div>
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Featured
      </motion.h2>
      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="grid min-[768px]:grid-cols-2 mt-10">
        {loading && <ListSkeleton listsToRender={4} />}
        {featuredData.map((blog, index) => (
          <Link to={`/blogs/${blog.title}`} className="min-[768px]:ms-4">
            <CardFlex
              key={index}
              img={blog.image}
              title={blog.title}
              paragraph={blog.paragraph}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Featured;
