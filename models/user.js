const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
});

// const Blog = mongoose.model("Blog", blogSchema);

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const userSchema = new mongoose.Schema({
    content: {
        username: string,
        name: string,
        password: string,
    blogs: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("User", userSchema);
