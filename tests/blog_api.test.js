const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const initialBlogs = require("./listHelper.test");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    // foreach is a function and await will only run correctly in its scope and not in beforeeach
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog);

        await blogObject.save();
    }
});

test.only("blogs are returned as json", async () => {
    console.log("entered test");
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
}, 100000);

test("there are 6 blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(6);
});

afterAll(() => {
    mongoose.connection.close();
});
