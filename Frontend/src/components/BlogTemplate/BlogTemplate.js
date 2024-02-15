import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

function BlogTemplate() {
  const [blogData, setBlogData] = useState({});
  const { title } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const encodedTitle = encodeURIComponent(title);
        const response = await fetch(`/blogs/myblogs/title/${encodedTitle}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setBlogData(data.blog);
        setLoading(false);
        setError("");
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
        setError("something went wrong please try again later.");
      }
    }

    fetchBlogData();
  }, [title]);

  return (
    <>
    <Helmet>
        <title>{`${blogData.category} | ${title}`}</title>
        <meta name="description" content="your favourite tech news platform" />
      </Helmet>
      {error && (
        <div>
          <h5 className="text-center mt-32 text-red-400">{error}</h5>{" "}
        </div>
      )}
      {loading && (
        <div className="w-3/4 mx-auto">
          <Skeleton
            variant="rect"
            height={320}
            width={"80%"}
            style={{ margin: "0 auto", display: "block" }}
          />
          <Skeleton
            variant="text"
            height={30}
            width={80}
            style={{ marginBottom: 10, marginTop: 20 }}
          />
          <Skeleton
            variant="text"
            height={15}
            width={150}
            style={{ marginBottom: 30 }}
          />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={20} style={{ marginTop: 30 }} />
          <Skeleton variant="text" height={20} style={{ marginTop: 30 }} />
          <Skeleton variant="text" height={20} style={{ marginTop: 30 }} />
          <Skeleton variant="text" height={20} style={{ marginTop: 30 }} />
        </div>
      )}
      {!loading && !error && (
        <div className="w-3/4 mx-auto">
          <img src={blogData.image} alt="" className="w-3/4 h-80 mx-auto" />
          <div>
            <h3 style={{ color: "var(--accent-color) " }}>
              {blogData.category}
            </h3>
            <h5 style={{ color: "grey" }}>
              published on {new Date(blogData.createdAt).toLocaleDateString()}
            </h5>
          </div>
          <h2>{blogData.title}</h2>
          <h4>{blogData.paragraph}</h4>
        </div>
      )}
    </>
  );
}

export default BlogTemplate;
