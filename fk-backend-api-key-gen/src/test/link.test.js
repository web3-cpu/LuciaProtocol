"use strict";
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import { Generated_link } from "../models/GeneratedLink.js";
import { Campaign } from "../models/campaign.js";
import { ApiKey } from "../models/ApiKey.js";
import { Client } from "../models/Client.js";
import { User } from "../models/User.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Link_clicks } from "../models/LinkClicks.js";

// test run command: node --experimental-vm-modules node_modules/jest/bin/jest.js
// ecmascript has partial jest support
// adding Jest to test in package.json gives an error

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});

describe("link create", () => {
  it("should create a link", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Generated_link.create = jest.fn().mockImplementation(() => {
      return {
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });
    const res = await request(app).post("/api/link/genlink").send({
      target: "https://test.com",
      platform: "telegram",
      channel: "crpto",
    });
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(Generated_link.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("negative test - no target link", async () => {
    const res = await request(app).post("/api/link/genlink").send({
      platform: "telegram",
      channel: "crpto",
    });
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("should create a link with given alias", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Generated_link.create = jest.fn().mockImplementation(() => {
      return {
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });
    const res = await request(app).post("/api/link/genlink").send({
      target: "https://test.com",
      channel: "crpto",
      alias: "odd",
    });
    const expectedBody = {
      done: true,
      link: "https://lucia-lg/odd",
    };
    expect(res.statusCode).toEqual(200);
  });

  it("will not create an alias if it already exists", async () => {
    Generated_link.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    const res = await request(app).post("/api/link/genlink").send({
      target: "https://test.com",
      channel: "crpto",
      alias: "test1",
    });

    expect(res.statusCode).toEqual(409);
  });

  it("Invalid URL", async () => {
    const res = await request(app).post("/api/link/genlink").send({
      target: "https://test",
      channel: "crpto",
      alias: "test1",
    });

    expect(res.statusCode).toEqual(400);
  });
});

describe("campaign create", () => {
  it("should create a campaign", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Generated_link.create = jest.fn().mockImplementation(() => {
      return {
        target: "https://test.com",
        client: "telegram",
        channel: "crpto",
      };
    });

    Campaign.create = jest.fn().mockImplementation(() => {
      return {
        id: 4,
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });

    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https://test.com",
        platform: "telegram",
        client: "client1",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(Generated_link.create).toHaveBeenCalled();
    expect(Campaign.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Authentication fail", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "bogushash",
    });
    Generated_link.create = jest.fn().mockImplementation(() => {
      return {
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https://test.com",
        platform: "telegram",
        client: "client1",
      })
      .set("X-API-KEY", "abc");
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("should create a campaign", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Generated_link.create = jest.fn().mockImplementation(() => {
      return {
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });

    Campaign.create = jest.fn().mockImplementation(() => {
      return {
        id: 4,
        target: "https://test.com",
        platform: "telegram",
        channel: "crpto",
      };
    });

    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https://test.com",
        platform: "telegram",
        client: "crpto",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Campaign - will not create an alias & campaign if it already exists", async () => {
    Generated_link.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https://test.com",
        platform: "telegram",
        client: "crpto",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(res.statusCode).toEqual(409);
  });

  it("Invalid URL", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https//test.com",
        platform: "telegram",
        client: "crpto",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid URL", async () => {
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https://goog",
        platform: "telegram",
        channel: "crpto",
      })
      .set("Authorization", "auth1");

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid URL", async () => {
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https//testcom",
        platform: "telegram",
        client: "crpto",
      })
      .set("Authorization", "auth1");

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid URL", async () => {
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: '"https:127.0.0.100/8000"',
        platform: "telegram",
        client: "crpto",
      })
      .set("Authorization", "auth1");

    expect(res.statusCode).toEqual(400);
  });

  it("Invalid URL", async () => {
    const res = await request(app)
      .post("/api/link/campaign")
      .send({
        target: "https",
        platform: "telegram",
        client: "crpto",
      })
      .set("Authorization", "auth1");

    expect(res.statusCode).toEqual(400);
  });
});

describe("redirect links", () => {
  it("should redirect for link", async () => {
    Generated_link.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Link_clicks.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Generated_link.increment = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await request(app).post("/api/link/redirect").send({
      data: {},
      path: "pqrst",
    });
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Link_clicks.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("should redirect for a campaign", async () => {
    Generated_link.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Link_clicks.create = jest.fn().mockImplementation(() => {
      return { id: 1, client_id: 5 };
    });
    Generated_link.increment = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await request(app).post("/api/link/redirect").send({
      data: {},
      path: "pqrst",
    });
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Link_clicks.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("link doesnt exist return 404 ", async () => {
    Generated_link.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Link_clicks.create = jest.fn().mockImplementation(() => {
      return { id: 1, client_id: 5 };
    });
    Generated_link.increment = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await request(app).post("/api/link/redirect").send({
      data: {},
    });
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(404);
    console.log("status code:" + (await res).statusCode);
  });

  it("link doesnt exist return 404 ", async () => {
    Generated_link.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Link_clicks.create = jest.fn().mockImplementation(() => {
      return { id: 1, client_id: 5 };
    });
    Generated_link.increment = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await request(app)
      .post("/api/link/redirect")
      .send({ data: {} });
    expect(Generated_link.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Link_clicks.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });
});
