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

const readFullDb = async () => {
    const response = await api.get("/api/blogs");
    const data = response.toJSON();
    console.log(data);
    console.log(data.body);
    return data;
};

let exampleBlog = {
    title: "just the HTTP PUT test",
    author: "Some Dev",
    url: "https://idontknow.com/",
    likes: 3,
};

const getFileSize = async () => {
    const response = await api.get("/api/blogs");
    const data = response.body;
    console.log(data.length);
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

    describe("check HTTP DELETE", () => {
        test("204 if its valid", async () => {
            const data = readFullDb();
        });
    });

    describe.only("check HTTP POST", () => {
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
            exampleBlog = {
                title: "just the HTTP PUT test",
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
