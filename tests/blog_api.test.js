const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const initialBlogs = require("./blog_initial_data");

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
    describe("check GET HTTP", () => {
        test("blogs are returned as json", async () => {
            await api
                .get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
        }, 100000);

        test("there are 6 initial  blogs", async () => {
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
    });
    describe("check HTTP PUT ", () => {
        test("check for 200 code and updated blog", async () => {
            const exampleBlog = {
                title: "just the HTTP PUT test",
                author: "Some Dev",
                url: "https://idontknow.com/",
                likes: 4,
            };

            const blogs = await api.get("/api/blogs");
            const index = 1;
            const id = blogs.body[index].id;

            const response = await api
                .put(`/api/blogs/${id}`)
                .send(exampleBlog);

            expect(response.status).toBe(204);

            const response2 = await api.get(`/api/blogs/${id}`);

            expect(response2.body.likes).toBe(exampleBlog.likes);
        });
    });

    describe("check HTTP DELETE", () => {
        test("Deletes random blog, 204, and 1 less blog", async () => {
            const beforeFileSize = await getFileSize();
            const blogs = await api.get("/api/blogs");

            const index = 1;
            // const index = Math.floor(Math.random() * beforeFileSize);

            const id = blogs.body[index].id;

            const response = await api.delete(`/api/blogs/${id}`);
            expect(response.status).toBe(204);

            const afterFileSize = await getFileSize();
            expect(afterFileSize).toBe(beforeFileSize - 1);
        });
    });

    describe("check HTTP POST", () => {
        let exampleBlog = {
            title: "this is a generic test",
            author: "Some Dev",
            url: "https://idontknow.com/",
            likes: 3,
        };
        test("check 201 status", async () => {
            const response = await api.post("/api/blogs").send(exampleBlog);
            expect(response.status).toBe(201);
        });

        test("check if id is present", async () => {
            const result = await api.post("/api/blogs").send(exampleBlog);

            expect(result.body.id).toBeDefined;
        });

        test("check that blogs increase by 1", async () => {
            const beforeFileSize = await getFileSize();
            await api.post("/api/blogs").send(exampleBlog);
            const afterFileSize = await getFileSize();
            expect(afterFileSize).toBe(beforeFileSize + 1);
        });

        test("check likes is defined otherwise defaults to 0", async () => {
            let exampleBlog = {
                title: "just the HTTP POST test at the end",
                author: "Some Dev",
                url: "https://idontknow.com/",
                // likes: 3,
            };
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
            exampleBlog = {
                // title: "just the HTTP PUT test",
                author: "Some Dev",
                // url: "https://idontknow.com/",
                likes: 3,
            };
            const result = await api.post("/api/blogs").send(exampleBlog);

            if (!("title" in result.body) && !("url" in result.body)) {
                expect(result.status).toBe(400);
            }
        });
    });
});
afterAll(() => {
    mongoose.connection.close();
});
