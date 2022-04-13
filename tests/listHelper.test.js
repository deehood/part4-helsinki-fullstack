const listHelper = require("../utils/list_helper");
const initialBlogs = require("./blog_initial_data");

test("dummy returns one", () => {
    const initialBlogs = [];

    const result = listHelper.dummy(initialBlogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    test("Empty list returns 0", () => {
        const result = listHelper.totaLikes([]);
        expect(result).toBe(0);
    });

    test("only 1 blog equals its likes", () => {
        const result = listHelper.totaLikes([initialBlogs[1]]);
        expect(result).toBe(5);
    });

    test("All list", () => {
        const result = listHelper.totaLikes(initialBlogs);
        expect(result).toBe(36);
    });
});

describe("Favorite blog", () => {
    test("normal", () => {
        const result = listHelper.favoriteBlog(initialBlogs);
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        });
    });
});

describe(" Most tests", () => {
    test("most initialBlogs", () => {
        const result = listHelper.mostBlogs(initialBlogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        });
    });

    test("most Likes", () => {
        const result = listHelper.mostLikes(initialBlogs);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 12,
        });
    });
});

module.exports = initialBlogs;
