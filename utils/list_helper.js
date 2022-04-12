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

module.exports = {
    dummy,
    totaLikes,
};
