const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
    //express-async-errors is taking care of try catch
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
    const blogs = await Blog.findById(request.params.id);
    response.json(blogs);
});

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
    const updatedBlog = request.body;

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
        new: true,
    });
    response.status(204).end();
});

blogRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    // deaults to 0 if not present
    if (!("likes" in blog.toJSON())) blog["likes"] = 0;

    // sends 400 status if both url and title not present
    if (!("title" in blog.toJSON()) && !("url" in blog.toJSON())) {
        response.status(400).end();
        return;
    }

    const result = await blog.save();

    response.status(201).json(result);
});

module.exports = blogRouter;
