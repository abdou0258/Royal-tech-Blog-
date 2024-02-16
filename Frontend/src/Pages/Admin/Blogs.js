import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ShowBlogs } from "../AdminApiOps/showBlogs";
import { check } from "../AdminApiOps/blogsPrivate";
import { deleteBlog } from "../AdminApiOps/deleteBlog";
import { Logout } from "../AdminApiOps/logout";
import Btn from "../../buttons/Btn";
import "./Blogs.css";
import { useNavigate } from "react-router";

const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array.from({ length: listsToRender }, (_, index) => (
        <div className="grid min-[769px]:grid-cols-2 items-center mt-8">
          <Skeleton
            variant="text"
            height={20}
            width={"80%"}
            style={{ marginBottom: 10, marginTop: 20 }}
          />
          <div className="flex justify-center">
            <Skeleton
              variant="rect"
              height={40}
              width={80}
              style={{ margin: "0 10px" }}
            />
            <Skeleton
              variant="rect"
              height={40}
              width={80}
              style={{ margin: "0 10px" }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

function Blogs() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        await ShowBlogs(setBlogs, navigate, setError, setLoading);
      } catch (error) {
        setError("Error fetching blogs");
      }
    };
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (blogId) => {
    await deleteBlog(blogId, setBlogs, setError);
  };

  const handleCheck = async () => {
    await check(navigate, setError);
  };
  useEffect(() => {
    handleCheck();
  }, []);

  const handleLogout = async (e) => {
    if (e) {
      e.preventDefault();
    }
    await Logout(navigate, setError);
  };

  const filterBlogs = () => {
    if (!selectedCategory) {
      return blogs;
    } else {
      return blogs.filter((blog) => blog.category === selectedCategory);
    }
  };

  return (
    <div id="blogs" className="pb-8">
      <form
        className="flex max-[769px]:justify-center justify-end min-[769px]:me-20"
        onSubmit={(e) => handleLogout(e)}
      >
        <Btn text="Logout" color="var(--accent-color)" />
      </form>
      <h1>My Blogs</h1>
      <div
        style={{
          height: "1px",
          width: "90%",
          backgroundColor: "black",
          margin: "20px auto",
        }}
      ></div>
      <form
        className="flex justify-center mb-10"
        onSubmit={() => navigate("/admin/blogs/addblog")}
      >
        <Btn text="Add Blog" color="var(--second-color)" />
      </form>
      <select
        className="select w-full max-w-xs mx-auto my-4 block border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option disabled defaultValue>
          Filter By Category
        </option>
        <option value="">All</option>
        <option value="Software">Software</option>
        <option value="Hardware">Hardware</option>
        <option value="BioTech">BioTech</option>
      </select>
      {loading && <ListSkeleton listsToRender={6} />}

      {!loading && blogs.length > 0 && (
        <div className="my-blogs">
          {filterBlogs().map((blog, index) => (
            <div
              key={index}
              className="grid min-[769px]:grid-cols-2 items-center"
            >
              <h3>{blog.title}</h3>
              <div className="mx-auto ">
                <button
                  type="submit"
                  className="edit"
                  onClick={() => navigate(`/admin/blogs/editblog/${blog._id}`)}
                >
                  <h5>Edit</h5>
                </button>
                <button
                  type="submit"
                  className="delete"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  <h5>Delete</h5>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="flex justify-center" style={{ color: "red" }}>
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default Blogs;
