const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
    //express-async-errors is taking care of try catch
    // try {
    const blogs = await Blog.find({});
    response.json(blogs);
    // } catch (exception) {
    //     next(exception);
    // }
});

blogRouter.post("/", async (request, response) => {
    const blog = new Blog(request.body);

    // deaults to 0 if not present

    if (!("likes" in blog.toJSON())) blog["likes"] = 0;

    const result = await blog.save();

    response.status(201).json(result);
});

module.exports = blogRouter;
