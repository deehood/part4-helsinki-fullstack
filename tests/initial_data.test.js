const {
  initialBlogs,
  dummy,
  totaLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("./test_helper");

describe("Dummy test", () => {
  test("dummy returns one", () => {
    const initialBlogs = [];

    const result = dummy(initialBlogs);
    expect(result).toBe(1);
  });
});

describe("Likes tests", () => {
  test("Empty list returns 0", () => {
    const result = totaLikes([]);
    expect(result).toBe(0);
  });

  test("only 1 blog equals its likes", () => {
    const result = totaLikes([initialBlogs[1]]);
    expect(result).toBe(5);
  });

  test("Sum of all likes", () => {
    const result = totaLikes(initialBlogs);
    expect(result).toBe(36);
  });
});

describe(" Most tests", () => {
  test("Who has most blogs", () => {
    const result = mostBlogs(initialBlogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("Who has most Likes", () => {
    const result = mostLikes(initialBlogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });

  test("Blog with the most likes", () => {
    const result = favoriteBlog(initialBlogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
