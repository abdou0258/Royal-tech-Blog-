import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../App.css";
import "./Latest.css";
const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map(() => (
          <>
            <div className="r-latest grid max-[769px]:grid-cols-2 max-[769px]:mt-8">
              <div className="grid min-[769px]:grid-cols-2 max-[769px]:m-2">
                <Skeleton
                  variant="rect"
                  className="min-[768px]:place-self-end my-2 h-32 max-[769px]:w-full max-[426px]:w-40 mb-0"
                />
                <div className="ms-4 max-[426px]:w-32 mt-2">
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
            </div>
          </>
        ))}
    </>
  );
};

function Latest() {
  const [latestData, setLatestData] = useState([]);
  const [firstItem, setFirstItem] = useState(null);
  const [restItems, setRestItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getLatest() {
    try {
      const response = await fetch("https://royal-tech-blog.onrender.com/blogs/myblogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.length > 1) {
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestData(sortedData);
      } else {
        const sortedData = data.blogs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestData(sortedData);
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
    getLatest();
  }, []);

  useEffect(() => {
    if (latestData.length > 0) {
      setFirstItem(latestData[0]);
      setRestItems(latestData.slice(1, 5));
    }
  }, [latestData]);

  return (
    <section id="latest">
      <motion.h2
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Latest
      </motion.h2>

      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="grid min-[769px]:grid-cols-2 gap-8 mt-8 max-[769px]:mb-8 max-[769px]:mt-0">
        {loading && (
          <div className="l-latest me-4">
            <Skeleton variant="rect" height={300} width={"100%"} />
            <Skeleton
              variant="text"
              height={40}
              style={{ marginBottom: 10, marginTop: 20 }}
            />
            <Skeleton variant="text" height={20} style={{ marginTop: 30 }} />
            <Skeleton variant="text" height={20} />
          </div>
        )}
        {firstItem && (
          <div className="l-latest me-4">
            <Link to={`/blogs/${firstItem.title}`}>
              <img
                src={firstItem.image}
                className="w-full h-3/4"
                alt="First item"
              />
              <h3>{firstItem.title}</h3>
              <h5>{firstItem.paragraph}</h5>
            </Link>
          </div>
        )}
        <div className="r-latest grid max-[769px]:grid-cols-2 max-[769px]:mt-20">
          {loading && <ListSkeleton listsToRender={4} />}

          {restItems.map((item, index) => (
            <div>
              <div
                key={index}
                className="grid min-[769px]:grid-cols-2 max-[769px]:m-2"
              >
                <img
                  src={item.image}
                  className="min-[768px]:place-self-end my-2 max-[769px]:w-48 max-[769px]:mx-auto max-[426px]:w-40"
                  alt={`Rest item ${index}`}
                />
                <div className="ms-4 max-[426px]:w-32">
                  <Link to={`/blogs/${item.title}`}>
                    <h5 className="font-bold">- {item.title}</h5>
                    <p>{item.paragraph}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Latest;
