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

    // sends 400 status if both url and title not present

    if (!("title" in blog.toJSON()) && !("url" in blog.toJSON())) {
        response.status(400).send();
        return;
    }

    const result = await blog.save();

    response.status(201).json(result);
});

module.exports = blogRouter;
