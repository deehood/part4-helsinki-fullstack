const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", async (request, response) => {
    const users = await User.find({});

    response.json(users);
});

userRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (!username || !password) {
        response.status(401).send("Username and Password must be filled");
        return;
    }

    if (username.length < 4 || password.length < 4) {
        response
            .status(402)
            .send("Username and Password must have at least 3 characters");
        return;
    }

    const users = await User.find({ username });

    if (users.length > 0) {
        response.status(403).send("Username already existes");
        return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = userRouter;
