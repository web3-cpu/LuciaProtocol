"use strict";
import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { Client } from "../src/models/Client.js";
import jwt from "jsonwebtoken";
import { ApiKey } from "../src/models/ApiKey.js";
import { User } from "../src/models/User.js";
import { Fingerprint } from "../src/models/Fingerprint.js";
import { Session } from "../src/models/Session.js";
import { Lucia_user } from "../src/models/LuciaUser.js";
import { Lucia_user_association_user } from "../src/models/Lucia_user_assoc_user.js";
import { User_association_client } from "../src/models/User_assoc_client.js";
import { Page_view } from "../src/models/Pageview.js";
import { Button_click } from "../src/models/ButtonClick.js";
import { Conversion_data } from "../src/models/ConversionData.js";

// test run command: node --experimental-vm-modules node_modules/jest/bin/jest.js
// ecmascript has partial jest support
// adding Jest to test in package.json gives an error

jest.useFakeTimers();
beforeEach(() => {
  jest.clearAllMocks();
});

// describe("api key", () => {
//   beforeEach(() => {
//     // Reset the environment variables before each test
//     process.env.TOKEN_SECRET = "default-secret";
//   });

//   it("should create a key", async () => {
//     Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//     // jest.mock("jsonwebtoken", () => ({
//     //   ...jest.requireActual("jsonwebtoken"), // import and retain the original functionalities
//     //   verify: jest.fn().mockReturnValue({
//     //     user: {
//     //       email: "abc@x.com",
//     //     },
//     //   }), // overwrite verify
//     // }));
//     // jest.mock("jsonwebtoken", () => ({
//     //   verify: jest.fn((token, secretOrPublicKey, options, callback) => {
//     //     return callback(null, {
//     //       user: {
//     //         email: "abc@x.com",
//     //       },
//     //     });
//     //   }),
//     // }));
//     const mockDecoded = {
//       email: "abc@x.com",
//     };
//     jest.spyOn(jwt, "verify").mockImplementation((token, secret, callback) => {
//       callback(null, mockDecoded);
//     });
//     ApiKey.create = jest.fn().mockImplementation(() => {
//       return {
//         key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
//       };
//     });
//     Client.findOne = jest.fn().mockReturnValueOnce({ email: "xyz@zbc.com" });
//     ApiKey.update = jest.fn().mockImplementation(() => {});
//     const res = await request(app)
//       .post("/api/key")
//       .send({})
//       .set(
//         "authorization",
//         "JWT 4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
//       );
//     //expect(Client.findOne).toHaveBeenCalled();
//     expect(res.statusCode).toEqual(200);
//     console.log("status code:" + (await res).statusCode);
//   });

//   // it("signup", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce(() => {
//   //     return null;
//   //   });
//   //   Client.create = jest.fn().mockImplementation(() => {
//   //     return { id: 4, name: "test" };
//   //   });
//   //   const res = await request(app).post("/api/oauth/signup/").send({
//   //     name: "test",
//   //     email: "xyz@abc.com",
//   //     password: "hjvbjhbv123",
//   //   });
//   //   expect(Client.findOne).toHaveBeenCalled();
//   //   expect(Client.create).toHaveBeenCalled();
//   //   expect(res.statusCode).toEqual(201);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("should not create a key", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//   //   ApiKey.create = jest.fn().mockImplementation(() => {
//   //     return {
//   //       key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
//   //     };
//   //   });
//   //   ApiKey.update = jest.fn().mockImplementation(() => {});
//   //   const res = await request(app).post("/api/key").send({});
//   //   expect(res.statusCode).toEqual(400);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("should create a key and a user", async () => {
//   //   Client.findOne = jest.fn().mockImplementation(() => {
//   //     return null;
//   //   });
//   //   //Client.findOne =  jest.fn().mockReturnValueOnce(()=>{return null});
//   //   Client.create = jest.fn().mockImplementation(() => {
//   //     return { id: 4, name: "test" };
//   //   });
//   //   ApiKey.update = jest.fn().mockImplementation(() => {});
//   //   ApiKey.create = jest.fn().mockImplementation(() => {
//   //     return {
//   //       key: "601b8003-74fd9747-d1732031-8f25a7c6-353d8ea7-dbebb6e6-a06d2ec5-40b65968",
//   //     };
//   //   });

//   //   const res = await request(app).post("/api/key").send({
//   //     client: "test",
//   //   });
//   //   expect(Client.findOne).toHaveBeenCalled();
//   //   expect(Client.create).toHaveBeenCalled();
//   //   expect(res.statusCode).toEqual(200);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("Authenticate key", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//   //   ApiKey.findOne = jest.fn().mockReturnValueOnce({
//   //     key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
//   //   });
//   //   const res = await request(app).post("/api/key/auth").send({
//   //     client: "test",
//   //     key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
//   //   });
//   //   expect(Client.findOne).toHaveBeenCalled();
//   //   expect(ApiKey.findOne).toHaveBeenCalled();
//   //   expect(res.statusCode).toEqual(200);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("Authenticate key - fail case 1", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//   //   ApiKey.findOne = jest.fn().mockReturnValueOnce({
//   //     key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
//   //   });
//   //   const res = await request(app).post("/api/key/auth").send({
//   //     key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
//   //   });
//   //   expect(res.statusCode).toEqual(400);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("Authenticate key - fail case 2", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//   //   ApiKey.findOne = jest.fn().mockReturnValueOnce({
//   //     key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
//   //   });
//   //   const res = await request(app).post("/api/key/auth").send({
//   //     client: "test",
//   //   });
//   //   expect(res.statusCode).toEqual(400);
//   //   console.log("status code:" + (await res).statusCode);
//   // });

//   // it("Authenticate key - fail case 3", async () => {
//   //   Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
//   //   ApiKey.findOne = jest
//   //     .fn()
//   //     .mockReturnValueOnce({ key: "falseHash", active: true });
//   //   const res = await request(app).post("/api/key/auth").send({
//   //     client: "test",
//   //     key: "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
//   //   });
//   //   expect(res.statusCode).toEqual(401);
//   //   console.log("status code:" + (await res).statusCode);
//   // });
// });

describe("user data storage", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env.NODE_ENV = "production";
  });
  it("store data for an existing user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - new session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Session.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
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
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("client not found - key not authorized", async () => {
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
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("key not found - key not authorized", async () => {
    ApiKey.findOne = jest.fn().mockReturnValueOnce(() => {
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG";
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request", async () => {
    ApiKey.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/user")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("Page view", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env.NODE_ENV = "production";
  });
  it("store page data for an existing user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("page view - create a new user for a client - new session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Session.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Page_view.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        page: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("client not found - key not authorized", async () => {
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
      .post("/api/sdk/page")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("key not found - key not authorized", async () => {
    ApiKey.findOne = jest.fn().mockReturnValueOnce(() => {
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG";
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request", async () => {
    ApiKey.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/page")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("track conversion", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env.NODE_ENV = "production";
  });
  it("store conversion data data for an existing user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        tag: "tester",
        amount: 0,
        event: {},
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Conversion_data.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("track conversion - create a new user for a client - new session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        tag: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Session.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("conversion data - create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        tag: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Conversion_data.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        tag: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("client not found - key not authorized", async () => {
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
      .post("/api/sdk/conversion")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("key not found - key not authorized", async () => {
    ApiKey.findOne = jest.fn().mockReturnValueOnce(() => {
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG";
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request", async () => {
    ApiKey.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/conversion")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("button click", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env.NODE_ENV = "production";
  });
  it("store button click data for an existing user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "submit",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Button click - create a new user for a client - new session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "submit",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(Session.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Button click - create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("button click - create a new user for a client - old session", async () => {
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
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });

    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "tester",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(Button_click.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("client not found - key not authorized", async () => {
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
      .post("/api/sdk/click")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("key not found - key not authorized", async () => {
    ApiKey.findOne = jest.fn().mockReturnValueOnce(() => {
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG";
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request", async () => {
    ApiKey.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/click")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});

describe("Init function", () => {
  beforeEach(() => {
    // Reset the environment variables before each test
    process.env.NODE_ENV = "production";
  });
  it("Init for an existing lucia_user and client", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });
    User.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    Lucia_user.findOne = jest
      .fn()
      .mockReturnValueOnce({ id: 12, unique_hash: "asdasd" });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      );
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Init for a new lucia_user for a client - new session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest
      .fn()
      .mockReturnValueOnce([{ id: 1, ip: "1.2.3.4" }, true]);
    // Fingerprint.findAll = jest
    //   .fn()
    //   .mockReturnValueOnce({ id: 1, ip: "1.2.3.4" }, { id: 2, ip: "1.2.3.4" });
    Fingerprint.findAll = jest.fn().mockImplementation(() => {
      return null;
    });
    Lucia_user.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user.create = jest.fn().mockImplementation(() => {
      return { id: 1, local_storage_hash_id: "1234" };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "submit",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      )
      .set("x-real-ip", "0.0.0.0");
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Lucia_user.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Init for a new lucia_user for a client - old session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest
      .fn()
      .mockReturnValueOnce([{ id: 1, ip: "1.2.3.4" }, true]);
    Fingerprint.findAll = jest.fn().mockReturnValueOnce([
      { id: 1, ip: "1.2.3.4" },
      { id: 2, ip: "1.2.3.4" },
    ]);
    // Fingerprint.findAll = jest.fn().mockImplementation(() => {
    //   return null;
    // });
    Lucia_user.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user.create = jest.fn().mockImplementation(() => {
      return { id: 1, local_storage_hash_id: "1234" };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "submit",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      )
      .set("x-real-ip", "0.0.0.0");
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Lucia_user.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("Init for a new lucia_user for a client - old session", async () => {
    Client.findOne = jest.fn().mockReturnValueOnce({ id: 12 });
    ApiKey.findOne = jest.fn().mockReturnValueOnce({
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG",
    });

    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Session.findOne = jest.fn().mockImplementation(() => {
      return { id: 1, lucia_user_hash_value: "asdsad" };
    });
    Fingerprint.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User_association_client.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Fingerprint.findOrCreate = jest
      .fn()
      .mockReturnValueOnce([{ id: 1, ip: "1.2.3.4" }, true]);
    Fingerprint.findAll = jest.fn().mockReturnValueOnce([
      { id: 1, ip: "1.2.3.4" },
      { id: 2, ip: "1.2.3.4" },
    ]);
    Lucia_user.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Button_click.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Lucia_user.create = jest.fn().mockImplementation(() => {
      return { id: 1, local_storage_hash_id: "1234" };
    });
    Lucia_user_association_user.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    Session.findOrCreate = jest.fn().mockReturnValueOnce([{ id: 1 }, true]);
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({
        session: {
          id: "b7f354a8-8fd6-4482-8493-f58946f1bb3c",
          hash: "db9833d71f43301b90a5eeca4d7f2eefd642b97f49187031ce11af350e5ca719",
        },
        user: {
          name: "user1",
          data: {
            data: { uniqueHash: "abc", screenWidth: 1200, screeHeight: 480 },
          },
        },
        lid: "lid",
        button: "submit",
      })
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2",
        "x-real-ip",
        "0.0.0.0"
      )
      .set("x-real-ip", "0.0.0.0");
    expect(Client.findOne).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalled();
    expect(User.create).toHaveBeenCalled();
    expect(ApiKey.findOne).toHaveBeenCalled();
    expect(Fingerprint.findOrCreate).toHaveBeenCalled();
    expect(Session.findOne).toHaveBeenCalled();
    expect(Lucia_user.create).toHaveBeenCalled();
    expect(res.statusCode).toEqual(200);
    console.log("status code:" + (await res).statusCode);
  });

  it("client not found - key not authorized", async () => {
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
      .post("/api/sdk/init")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });

  it("key not found - key not authorized", async () => {
    ApiKey.findOne = jest.fn().mockReturnValueOnce(() => {
      key: "$2b$10$V3FM17vo0nqSdKy0ephqu.VyCI/rGDkkNOXBN4.A9QRehzNcxQliG";
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(400);
    console.log("status code:" + (await res).statusCode);
  });

  it("bad request", async () => {
    ApiKey.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    User.findOne = jest.fn().mockImplementation(() => {
      return null;
    });
    Client.findOne = jest.fn().mockReturnValueOnce({
      id: "1",
    });
    Fingerprint.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    User.create = jest.fn().mockImplementation(() => {
      return { id: 1 };
    });
    const res = await await request(app)
      .post("/api/sdk/init")
      .send({})
      .set(
        "X-API-KEY",
        "4c6fdaba-7c4d641f-9ca31d3c-2c775c8f-a45fb754-3fe72360-111ff045-10b7b2e2"
      );
    expect(res.statusCode).toEqual(401);
    console.log("status code:" + (await res).statusCode);
  });
});
