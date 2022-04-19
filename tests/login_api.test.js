const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { initialUsers } = require("./test_helper");

const api = supertest(app);

const saltThePassword = async (password) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
};

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of initialUsers) {
    let userObject = new User(user);
    await userObject.save();
  }
});

describe("LOGIN POST", () => {
  const exampleLogin = {
    username: "micas",
    password: "coisas",
  };

  test("Status should be 201", async () => {
    // hash password and put it in DB

    await User.findOneAndUpdate(
      { username: exampleLogin.username },
      { passwordHash: await saltThePassword(exampleLogin.password) },
      { new: "true" }
    );

    const result = await api.post("/").send(exampleLogin);
    expect(result.status).toBe(201);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
