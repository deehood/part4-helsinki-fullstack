const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, exampleBlog } = require("./blog_initial_data");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    // foreach is a function and await will only run correctly in its scope and not in beforeEach
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog);

        await blogObject.save();
    }
});

const getFileSize = async () => {
    const response = await api.get("/api/blogs");
    const data = response.body;
    return data.length;
};

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

    describe("check HTTP POST", () => {
        test("check 201 status", async () => {
            const response = await api.post("/api/blogs").send(exampleBlog);
            expect(response.status).toBe(201);
        });

        test("check that blogs increase by 1", async () => {
            const beforeFileSize = await getFileSize();
            await api.post("/api/blogs").send(exampleBlog);
            const afterFileSize = await getFileSize();
            expect(afterFileSize).toBe(beforeFileSize + 1);
        });

        test("check likes is defined otherwise defaults to 0", async () => {
            const result = await api.post("/api/blogs").send(exampleBlog);

            if (!("likes" in result.toJSON())) {
                const blogs = await api.get("/api/blogs");
                const idNewPost = blogs.body[blogs.body.length - 1].id;

                const newPost = blogs.body.find(
                    (blog) => blog.id === idNewPost
                );

                expect(newPost.likes).toBeDefined();
            }
        });

        test("check if tile and url present otherwise status 400", async () => {
            const result = await api.post("/api/blogs").send(exampleBlog);

            console.log(Object.keys(result.body));
            if (!(("title" || "url") in result.body)) {
                expect(result.status).toBe(400);
            }
        });
    });
});
afterAll(() => {
    mongoose.connection.close();
});
