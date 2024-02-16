import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
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

function SearchResults({ searchQuery }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchQuery) {
      const fetchResults = async () => {
        const response = await fetch(
          `https://royal-tech-blog.onrender.com/blogs/myblogs/results/search?q=${searchQuery}`
        );
        const data = await response.json();
        if (data.length > 1) {
          setResults(data);
        } else {
          setResults(data.blogs);
        }
        setLoading(false);
        setError("");
      };

      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
      setError("something went wrong please try again later.");
    }
  }, [searchQuery]);

  return (
    <>
      {error && (
        <div>
          <h5 className="text-center text-red-400">{error}</h5>{" "}
        </div>
      )}
      <div className="search-results mt-8 grid min-[768px]:grid-cols-3 ">
        {loading && <ListSkeleton listsToRender={3} />}
        {results.map((result) => (
          <div className="search-result max-[769px]:w-3/5 max-[769px]:mx-auto max-[426px]:mx-0">
            <Link to={`/blogs/${result.title}`}>
              <CardNoBg
                key={result.id}
                img={result.image}
                title={result.title}
                paragraph={result.paragraph}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchResults;
