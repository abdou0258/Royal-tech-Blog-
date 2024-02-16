import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CardFlex from "../Cards/CardFlex";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

function Trending() {
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBlogs() {
    try {
      const response = await fetch("/blogs/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.length > 1) {
        const trendingBlogs = data.sort((a, b) => b.pageViews - a.pageViews);
        setTrendingData(trendingBlogs.slice(0, 4));
      } else {
        const trendingBlogs = data.blogs.sort(
          (a, b) => b.pageViews - a.pageViews
        );
        setTrendingData(trendingBlogs.slice(0, 4));
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
    fetchBlogs();
  }, []);

  return (
    <section id="trending">
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Trending
      </motion.h2>
      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="grid min-[768px]:grid-cols-2 mt-10">
        {loading && <ListSkeleton listsToRender={4} />}
        {trendingData.map((blog, index) => (
          <Link to={`/blogs/${blog.title}`}>
            <CardFlex
              key={index}
              img={blog.image}
              title={blog.title}
              paragraph={blog.paragraph}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Trending;
