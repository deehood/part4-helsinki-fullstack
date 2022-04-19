const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { initialUsers } = require("./test_helper");

const api = supertest(app);

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
    const result = await api.post("/").send(exampleLogin);
    expect(result.status).toBe(201);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
