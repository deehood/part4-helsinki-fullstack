// const _ = require("lodash");

const initialUsers = [
  {
    username: "jinfo",
    name: "James fortis",
    password: "whatisthat",
  },
  {
    username: "morango",
    name: "monica lewinski",
    password: "cigar",
  },
  {
    username: "micas",
    name: "mikosio roma",
    password: "coisas",
    blogs: [],
  },
];

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Delete TEST",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

// eslint-disable-next-line no-unused-vars
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

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
// returns object with authors and accumulated blog posts
const mostBlogs = (blogs) => {
  // LODASH method
  // const authorsBlogCount = _.countBy(blogs, (blog) => blog.author);

  // REDUCE method

  const authorsBlogCount = blogs.reduce((accum, cur) => {
    accum[cur.author] ? (accum[cur.author] += 1) : (accum[cur.author] = 1);
    return accum;
  }, {});

  const max = Math.max(...Object.values(authorsBlogCount));

  return {
    author: getKeyByValue(authorsBlogCount, max),
    blogs: max,
  };
};

const mostLikes = (blogs) => {
  let maxLikes = 0;
  let authorMax = "";

  blogs.forEach((element) => {
    if (element.likes > maxLikes) {
      maxLikes = element.likes;
      authorMax = element.author;
    }
  });

  return {
    author: authorMax,
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totaLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  initialUsers,
};
