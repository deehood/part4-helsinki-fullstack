const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, testBlog } = require("./blog_initial_data");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    // foreach is a function and await will only run correctly in its scope and not in beforeeach
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog);

        await blogObject.save();
    }
});

describe("API tests", () => {
    test("blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }, 100000);

    test("there are 6 blogs", async () => {
        const response = await api.get("/api/blogs");

        expect(response.body).toHaveLength(6);
    });

    test("Check if 'id' exists", async () => {
        const response = await api.get("/api/blogs");
        const data = response.body;
        for (let i = 0; i < data.length; i++) {
            expect(data[i].id).toBeDefined();
            // console.log(`record ${i}`);
        }
    });

    test("check HTTP POST", () => {});
});

afterAll(() => {
    mongoose.connection.close();
});
