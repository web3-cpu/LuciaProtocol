"use strict";
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import { ApiKey } from "../models/ApiKey.js";
import { Client } from "../models/Client.js";
import { User } from "../models/User.js";
import { Fingerprint } from "../models/Fingerprint.js";
import { Page_view } from "../models/Pageview.js";
import { Conversion_data } from "../models/ConversionData.js";
import { Button_click } from "../models/ButtonClick.js";
import { Generated_link } from "../models/GeneratedLink.js";
import { Campaign } from "../models/campaign.js";

// test run command: node --experimental-vm-modules node_modules/jest/bin/jest.js
// ecmascript has partial jest support
// adding Jest to test in package.json gives an error

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});

describe("api key", () => {
  it("should create a key", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.create = jest.fn().mockImplementation(() => {
      return {
        key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
      };
    });
    ApiKey.update = jest.fn().mockImplementation(() => {});
    const res = await request(app).post("/api/key").send({
      client: "test",
    });
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("should not create a key", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.create = jest.fn().mockImplementation(() => {
      return {
        key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
      };
    });
    ApiKey.update = jest.fn().mockImplementation(() => {});
    const res = await request(app).post("/api/key").send({});
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("should create a key and a user", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    //Client.findOne =  jest.fn().mockReturnValueOnce(()=>{return null});
    Client.create = jest.fn().mockImplementation(() => {
      return { id: 4, name: "test" };
    });
    ApiKey.update = jest.fn().mockImplementation(() => {});
    ApiKey.create = jest.fn().mockImplementation(() => {
      return {
        key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
      };
    });

    const res = await request(app).post("/api/key").send({
      client: "test",
    });
    expect(Client.findOne).toHaveBeenCalled();
    expect(Client.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Authenticate key", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await request(app).post("/api/key/auth").send({
      client: "test",
      key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
    });
    expect(Client.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Authenticate key - fail case 1", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await request(app).post("/api/key/auth").send({
      key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
    });
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("Authenticate key - fail case 2", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await request(app).post("/api/key/auth").send({
      client: "test",
    });
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("Authenticate key - fail case 3", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest
      .fn()
      .mockReturnValueOnce({ key: "falseHash", active: true });
    const res = await request(app).post("/api/key/auth").send({
      client: "test",
      key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
    });
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("user data storage", () => {
  it("store data for an existing user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store data for an existing user and client and existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });

    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store data for a new user and an existing client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store data for a new user and an existing client and existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("dont store data for an unknown client", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request error for missing user field", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request error for missing client field", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("authentication error - wrong api key", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set("X-API-KEY", "wrongkey");
    expect(Client.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("Page view", () => {
  it("store page view for a client and known user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Page_view.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store page view for a client and known user and an existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Page_view.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store page view for a client and unknown user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Page_view.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store page view for a client and unknown user and an existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Page_view.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for no page in request body", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for an unkown client", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("authentication failed", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        page: "tester",
      })
      .set("X-API-KEY", "wrongHash");
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("track conversion", () => {
  it("store track conversion for a client and known user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Conversion_data.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store track conversion for a client and known user and existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Conversion_data.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store track conversion for a client and unknown user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Conversion_data.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store track conversion for a client and unknown user and an existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Conversion_data.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for no page in request body", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for an unkown client", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("authentication failed", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        event: "tester",
      })
      .set("X-API-KEY", "wrongHash");
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("button click", () => {
  it("store button click for a client and known user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store button click for a client and known user and create a new fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );

    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store button click for a client and unknown user", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.create).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("store button click for a client and unknown user and an existing fingerprint", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockReturnValueOnce({ id: 12 });

    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOne).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for no button in request body", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request for an unkown client", async () => {
    Client.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("authentication failed", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });

    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        client: "test",
        user: {
          name: "user1",
          data: {},
        },
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3ffe72360-111ff045-10b7b2e2"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});
