"use strict";
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { Client } from "../src/models/Client.js";

// test run command: node --experimental-vm-modules node_modules/jest/bin/jest.js
// ecmascript has partial jest support
// adding Jest to test in package.json gives an error

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});
describe("signup and login", () => {
  it("create new client - signup", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce(() => {
      return null;
    });
    Client.create = jest.fn().mockImplementation(() => {
      return { id: 4, name: "test" };
    });
    const res = await request(app).post("/api/oauth/signup/").send({
      name: "test",
      email: "xyz@abc.com",
      password: "hjvbjhbv123",
    });
    expect(Client.findOne).toHaveBeenCalled();
    expect(Client.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(201);
    console.log("status code:" + (await res).statusCode);
  });

  it("existing client - signup", async () => {
    Client.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, email: "test@xyz.com" });

    const res = await request(app).post("/api/oauth/signup/").send({
      name: "test",
      email: "xyz@abc.com",
      password: "hjvbjhbv123",
    });
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });
});
