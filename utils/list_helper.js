const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1;
};

const totaLikes = (blogs) => {
    if (blogs.length === 0) return 0;
    if (blogs.length === 1) return blogs[0].likes;

    const total = blogs.reduce((sum, blog) => {
        return sum + blog.likes;
    }, 0);
    return total;
};

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map((x) => x.likes));

    const favoriteBlog = blogs.find((blog) => blog.likes === maxLikes);

    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: maxLikes,
    };
};

module.exports = {
    dummy,
    totaLikes,
    favoriteBlog,
};
