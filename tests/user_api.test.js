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

describe("USER API tests", () => {
  describe("GET tests", () => {
    test("users are returned as json", async () => {
      await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);

    test("Size is correct", async () => {
      const response = await api.get("/api/users");
      expect(response.body.length).toBe(initialUsers.length);
    });
  });

  describe("POST tests", () => {
    let exampleUser = {
      username: "zorro",
      name: "zorrito zas",
      password: "zulmira",
    };
    test("status 201", async () => {
      const result = await api.post("/api/users").send(exampleUser);
      expect(result.status).toBe(201);
    });
  });

  describe("User Validation", () => {
    test("username and password must exist. 401 otherwise", async () => {
      let exampleUser = {
        username: null, // doent exist
        name: "zamunda",
        password: "zulmira",
      };
      const result = await api.post("/api/users").send(exampleUser);

      expect(result.status).toBe(401);
    });

    test("username and password must have at least 3 char. 402 otherwise", async () => {
      let exampleUser = {
        username: "zissxs",
        name: "zamunda",
        password: "zu", //2 letters
      };
      const result = await api.post("/api/users").send(exampleUser);

      expect(result.status).toBe(402);
    });
    test("username must be unique. 403 otherwise", async () => {
      let exampleUser = {
        username: "morango", //repeated
        name: "zamunda",
        password: "zukm",
      };
      const result = await api.post("/api/users").send(exampleUser);

      expect(result.status).toBe(403);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
