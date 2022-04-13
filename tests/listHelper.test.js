const listHelper = require("../utils/list_helper");

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0,
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0,
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0,
    },
];

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
