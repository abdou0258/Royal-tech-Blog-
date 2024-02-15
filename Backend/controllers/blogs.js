const Blog = require("../models/Blog");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,

  NotFoundError,
} = require("../errors");

const AddBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ blog });
};
const ShowBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(StatusCodes.OK).json({ blogs });
};
const showResult = async (req, res) => {
  try {
    const { query } = req;
    let filter = {};

    if (query.q) {
      filter = { title: { $regex: query.q, $options: "i" } };
    }

    const blogs = await Blog.find(filter);

    res.status(StatusCodes.OK).json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

const UpdateBlog = async (req, res) => {
  const {
    body: { myblog },

    params: { id: blogID },
  } = req;
  if (myblog === "") {
    throw new BadRequestError("blog field cannot be empty");
  }
  const blog = await Blog.findOneAndUpdate({ _id: blogID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    throw new NotFoundError(`No blog with id ${blog}`);
  }
  res.status(StatusCodes.OK).json({ blog });
};
const GetBlog = async (req, res) => {
  const {
    params: { id: blogID },
  } = req;
  const blog = await Blog.findOne({ _id: blogID });
  if (!blog) {
    throw new NotFoundError(`No blog with id ${blogID}`);
  }
  res.status(StatusCodes.OK).json({ blog });
};
const GetBlogByTitle = async (req, res) => {
  const {
    params: { title: blogTitle },
  } = req;
  const blog = await Blog.findOneAndUpdate(
    { title: blogTitle },
    { $inc: { pageViews: 1 } },
    { new: true }
  );

  if (!blog) {
    throw new NotFoundError(`No blog with title ${blogTitle}`);
  }
  res.status(StatusCodes.OK).json({ blog });
};
const DeleteBlog = async (req, res) => {
  const {
    params: { id: blogID },
  } = req;
  const blog = await Blog.findOneAndDelete({ _id: blogID });
  if (!blog) {
    throw new NotFoundError(`No blog with id ${blogID}`);
  }
  res.status(StatusCodes.OK).json({ blog });
};

module.exports = {
  AddBlog,
  ShowBlogs,
  UpdateBlog,
  GetBlog,
  DeleteBlog,
  GetBlogByTitle,
  showResult,
};
