const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");

const User = require("../models/user");
const { SECRET } = require("../utils/config");

blogRouter.get("/", async (request, response) => {
  //express-async-errors is taking care of try catch
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blogs = await Blog.findById(request.params.id);
  response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog) {
    if (blog.user.toString() === decodedToken.id.toString()) {
      //delete blog
      await Blog.findByIdAndRemove(request.params.id);

      // delete blog in user blogs

      const user = await User.findById(decodedToken.id);

      const newUserblogs = await user.blogs.filter(
        (x) => x.toString() !== request.params.id
      );

      await User.findByIdAndUpdate(decodedToken.id, { blogs: newUserblogs });
      response.status(204).json({ yay: "deleted" });
    } else response.status(401).json({ error: "invalid deletion" });
  } else response.status(401).send({ error: "Not found" });
});

blogRouter.put("/:id", async (request, response) => {
  const updatedBlog = request.body;

  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
  });
  response.status(204).json({ yay: "updated" });
});

blogRouter.post("/", async (request, response) => {
  //check token

  const decodedToken = jwt.verify(request.token, SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog(request.body);

  // deaults to 0 if not present
  if (!("likes" in blog.toJSON())) blog["likes"] = 0;

  // sends 400 status if both url and title not present
  if (!("title" in blog.toJSON()) && !("url" in blog.toJSON())) {
    response.status(400).end();
    return;
  }

  // Save userid in blog db
  let user = await User.findById(decodedToken.id);
  user && (blog.user = user._id);
  await blog.save();

  // save blogid in user db
  if (user) {
    user.blogs.push(blog._id);
    await user.save();
  }

  response.status(201).json(blog);
});

module.exports = blogRouter;
