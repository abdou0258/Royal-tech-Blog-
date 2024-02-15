import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CardNoBg from "../components/Cards/CardNoBg";
import Featured from "../components/Featured/Featured";
import "../App.css";
import SearchResults from "../components/SearchResults/SearchResults";

const Hardware = () => {
  const [hardwareData, setHardwareData] = useState([]);

  const initialBlogsToShow = 3;
  const [blogsToShow, setBlogsToShow] = useState(initialBlogsToShow);

  async function fetchBlogs() {
    try {
      const response = await fetch("/blogs/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const hardwareBlogs = data.blogs.filter(
        (blog) => blog.category === "Hardware"
      );
      setHardwareData(hardwareBlogs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setBlogsToShow((prevCount) => prevCount + initialBlogsToShow);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Helmet>
        <title>Royal Tech | Hardware</title>
        <meta name="description" content="your favourite tech news platform" />
      </Helmet>
      <Header onSearch={handleSearch} />
      <div className="App">
        {searchQuery && <SearchResults searchQuery={searchQuery} />}
        {!searchQuery && (
          <>
            <motion.h1
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hardware
            </motion.h1>
            <Featured category="Hardware" />
            <div
              style={{
                height: "1px",
                width: "100%",
                backgroundColor: "black",
                margin: "20px 0",
              }}
            ></div>
            <div className="grid min-[768px]:grid-cols-3">
              {hardwareData.slice(0, blogsToShow).map((blog, index) => (
                <Link to={`/blogs/${blog.title}`}>
                  <CardNoBg
                    key={index}
                    img={blog.image}
                    title={blog.title}
                    paragraph={blog.paragraph}
                  />
                </Link>
              ))}
            </div>
            {blogsToShow < hardwareData.length && (
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Hardware;
