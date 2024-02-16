import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../../App.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardNoBg from "../Cards/CardNoBg";
const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map(() => (
          <>
            <div className="max-[426px]:w-3/4">
              <div className="my-16 mx-5 min-[768px]:m-6  ">
                <Skeleton variant="rect" className="w-full h-40 mb-12" />

                <Skeleton
                  variant="text"
                  height={20}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  variant="text"
                  height={20}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton
                  variant="text"
                  height={10}
                  style={{ marginTop: 15 }}
                />
                <Skeleton variant="text" height={10} />
              </div>
            </div>
          </>
        ))}
    </>
  );
};

function Top() {
  const [topData, setTopData] = useState([]);
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
        const topBlogs = data
          .filter((blog) => blog.type === "top")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTopData(topBlogs.slice(0, 3));
      } else {
        const topBlogs = data.blogs
          .filter((blog) => blog.type === "top")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTopData(topBlogs.slice(0, 3));
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
    <section id="top">
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Top
      </motion.h2>
      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="grid min-[768px]:grid-cols-3 ">
        {loading && <ListSkeleton listsToRender={3} />}
        {topData.map((blog, index) => (
          <Link to={`/blogs/${blog.title}`} className="max-[426px]:w-3/4">
            <CardNoBg
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

export default Top;
