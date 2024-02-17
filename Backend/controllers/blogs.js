const Blog = require("../models/Blog");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const redisClient = require("../database/redisConfig");
const {
  BadRequestError,

  NotFoundError,
} = require("../errors");

const AddBlog = async (req, res) => {
  const blog = await Blog.create(req.body);
  await redisClient.del("blogs");
  res.status(StatusCodes.CREATED).json({ blog });
};
const ShowBlogs = async (req, res) => {
  const blogsCacheKey = "blogs";
  const cachedBlogs = await redisClient.get(blogsCacheKey);

  if (cachedBlogs) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedBlogs)); // cached
  } else {
    const blogs = await Blog.find();

    await redisClient.set(blogsCacheKey, JSON.stringify(blogs));
    res.status(StatusCodes.OK).json({ blogs }); //not cached
  }
};
const showResult = async (req, res) => {
  const filteredBlogsCacheKey = "filteredBlogs";
  const filteredCachedBlogs = await redisClient.get(filteredBlogsCacheKey);

  const { query } = req;
  let filter = {};

  if (query.q) {
    filter = { title: { $regex: query.q, $options: "i" } };
  }
  if (filteredCachedBlogs) {
    return res.status(StatusCodes.OK).json(JSON.parse(filteredCachedBlogs));
  } else {
    const blogs = await Blog.find(filter);

    await redisClient.set(filteredBlogsCacheKey, JSON.stringify(blogs));
    res.status(StatusCodes.OK).json({ blogs });
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
  await redisClient.del("blogs");
  res.status(StatusCodes.OK).json({ blog });
};
const GetBlog = async (req, res) => {
  const {
    params: { id: blogID },
  } = req;
  const cachedBlogKey = `blog:${blogID}`;
  const cachedBlog = await redisClient.get(cachedBlogKey);
  if (cachedBlog) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedBlog));
  } else {
    const blog = await Blog.findOne({ _id: blogID });
    if (!blog) {
      throw new NotFoundError(`No blog with id ${blogID}`);
    }
    await redisClient.set(cachedBlogKey, JSON.stringify(blog));
    res.status(StatusCodes.OK).json({ blog });
  }
};
const GetBlogByTitle = async (req, res) => {
  const {
    params: { title: blogTitle },
  } = req;

  const cachedBlogKey = `blog:${blogTitle}`;
  const cachedBlog = await redisClient.get(cachedBlogKey);
  if (cachedBlog) {
    return res.status(StatusCodes.OK).json(JSON.parse(cachedBlog));
  } else {
    const blog = await Blog.findOneAndUpdate(
      { title: blogTitle },
      { $inc: { pageViews: 1 } },
      { new: true }
    );

    if (!blog) {
      throw new NotFoundError(`No blog with title ${blogTitle}`);
    }
    await redisClient.set(cachedBlogKey, JSON.stringify(blog));
    res.status(StatusCodes.OK).json({ blog });
  }
};
const DeleteBlog = async (req, res) => {
  const {
    params: { id: blogID },
  } = req;
  const blog = await Blog.findOneAndDelete({ _id: blogID });
  if (!blog) {
    throw new NotFoundError(`No blog with id ${blogID}`);
  }
  await redisClient.del("blogs");
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
