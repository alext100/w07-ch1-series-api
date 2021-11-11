require("dotenv").config();
const debug = require("debug")("series:testing:endpoints");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { initializeServer, app } = require("..");
const initializeMongo = require("../../database");
const User = require("../../database/models/user");

const request = supertest(app);

let server;
let token;

beforeAll(async () => {
  await initializeMongo(process.env.MONGODB_STRING_TEST);
  await User.deleteMany({});
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

afterAll((done) => {
  server.close(async () => {
    await mongoose.connection.close();
    debug(chalk.red("Server conection ended"));
    done();
  });
});

beforeEach(async () => {
  await User.create({
    name: "admin",
    username: "admin",
    password: await bcrypt.hash("admin", 10),
    admin: true,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a /login endpoint", () => {
  describe("When a POST request arrives with a bad username and password", () => {
    test("Then it should respond with a 401 error", async () => {
      await request
        .post("/users/login")
        .send({ username: "a", password: "a" })
        .expect(401);
    });
  });
  describe("When a POST request arrives with the correct username and password", () => {
    test("Then it should respond with a 200", async () => {
      await request
        .post("/users/login")
        .send({ username: "admin", password: "admin" })
        .expect(200);
    });
  });
});

describe("Given a /register endpoint", () => {
  describe("When a POST request arrives with bad parameters", () => {
    test("Then it should respond with a 400 error", async () => {
      await request.post("/users/register").send({}).expect(400);
    });
  });
  describe("When a POST request arrives with the right parameters", () => {
    test("Then it should respond with a 200", async () => {
      const user = {
        name: "manolo",
        username: "manolo",
        password: await bcrypt.hash("hola123", 10),
        admin: "false",
      };
      await request.post("/users/register").send(user).expect(200);
    });
  });
});
