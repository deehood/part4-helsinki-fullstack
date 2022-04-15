const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/blog");
const { initialUsers, getUsernames } = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});

    // foreach is a function and await will only run correctly in its scope and not in beforeEach
    for (let user of initialUsers) {
        let userObject = new User(user);
        await userObject.save();
    }
});

describe("USER API tests", () => {
    test("primeiro", () => {
        console.log(getUsernames(User));
    });
});