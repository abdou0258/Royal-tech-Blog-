import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "../Cards/Card";

const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map(() => (
          <>
            <div className="max-[426px]:w-3/4">
              <div className="my-16 mx-5 min-[768px]:m-6  ">
                <Skeleton variant="rect" className="w-full h-48 mb-12" />

                <Skeleton
                  variant="text"
                  height={15}
                  width={50}
                  style={{ marginBottom: 20 }}
                />
                <Skeleton
                  variant="text"
                  height={20}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton variant="text" height={20} style={{ marginTop: 6 }} />
              </div>
            </div>
          </>
        ))}
    </>
  );
};

function MoreBlogs() {
  const initialBlogsToShow = 4;
  const [blogsToShow, setBlogsToShow] = useState(initialBlogsToShow);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchBlogs() {
    try {
      const response = await fetch("https://royal-tech-blog.onrender.com/blogs/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.length > 1) {
        const moreBlogs = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(moreBlogs);
      } else {
        const moreBlogs = data.blogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(moreBlogs);
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

  const handleLoadMore = () => {
    setBlogsToShow((prevCount) => prevCount + initialBlogsToShow);
  };

  return (
    <section id="more-blogs">
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        More Blogs
      </motion.h2>
      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="grid min-[768px]:grid-cols-2 mt-10">
        {loading && <ListSkeleton listsToRender={4} />}
        {blogs.slice(0, blogsToShow).map((blog, index) => (
          <Link to={`/blogs/${blog.title}`}>
            <Card
              key={index}
              img={blog.image}
              category={blog.category}
              title={blog.title}
            />
          </Link>
        ))}
      </div>
      {blogsToShow < blogs.length && (
        <button
          style={{ display: "block", margin: "0 auto" }}
          className="mt-16"
          onClick={handleLoadMore}
        >
          <h5
            style={{
              color: "var(--second-color)",
              textDecoration: "underline",
            }}
            className="mt-16"
          >
            Load More
          </h5>
        </button>
      )}
    </section>
  );
}

export default MoreBlogs;
