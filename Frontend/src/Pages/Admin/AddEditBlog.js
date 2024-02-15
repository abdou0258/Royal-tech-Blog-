import React, { useEffect, useState } from "react";
import Btn from "../../buttons/Btn";
import { getBlog } from "../AdminApiOps/getBlog";
import { check } from "../AdminApiOps/addEditBlogPrivate";
import { useNavigate, useParams } from "react-router";
import { updateBlog } from "../AdminApiOps/updateBlog";
import { addBlog } from "../AdminApiOps/addBlog";

function AddEditBlog({ action }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Software");
  const [paragraph, setParagraph] = useState("");
  const [type, setType] = useState("top");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRadioChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    if (action === "Edit") {
      getBlog(
        id,
        setTitle,
        setCategory,
        setParagraph,
        setType,
        setImage,
        setError
      );
    }
  }, [id, action]);

  const handleCheck = async () => {
    await check(action, navigate, setError);
  };

  handleCheck();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || title.length < 10 || title.length > 60) {
      return setError("please enter a title (minimum 10 and maximum is 50)");
    }
    if (!paragraph || paragraph.length < 50 || paragraph.length > 300) {
      return setError(
        "please enter a paragraph(minimum 50 and maximum is 300)"
      );
    }
    if (!image) {
      return setError("please enter an image");
    }
    if (action === "Add") {
      addBlog(navigate, setError, title, category, type, paragraph, image);
    } else {
      updateBlog(
        id,
        navigate,
        setError,
        title,
        category,
        type,
        paragraph,
        image
      );
    }
  }

  function convertBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }

  return (
    <div>
      <h1>{action} Blog </h1>
      <form
        className="flex flex-col mx-auto w-2/4 "
        id="login-form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">
          <h5>Title:</h5>{" "}
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="category">
          <h5>Category:</h5>{" "}
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Software</option>
          <option>Hardware</option>
          <option>BioTech</option>
        </select>
        <label htmlFor="type">
          <h5>Type:</h5>
        </label>
        <label className="mt-5">
          <input
            type="radio"
            name="customRadio"
            value="top"
            checked={type === "top"}
            onChange={handleRadioChange}
            id="type"
          />
          Top
        </label>
        <label>
          <input
            type="radio"
            name="customRadio"
            value="featured"
            checked={type === "featured"}
            onChange={handleRadioChange}
            id="type"
          />
          Featured
        </label>

        {/* Add image input */}
        <label for="image">
          <h5>Image:</h5>
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={convertBase64}
        />
        <img src={image} alt="" width={100} className="mt-4" />

        <label for="paragraph">
          <h5>Paragraph:</h5>
        </label>
        <textarea
          name="paragraph"
          id="paragraph"
          cols="30"
          rows="10"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        ></textarea>
        {error && (
          <div className="flex justify-center pt-2 " style={{ color: "red" }}>
            Error: {error}
          </div>
        )}
        <div className="flex justify-center mb-5" id="add-edit-blog">
          <Btn text={`${action} Blog`} color="var(--second-color) " />
        </div>
      </form>
    </div>
  );
}

export default AddEditBlog;
