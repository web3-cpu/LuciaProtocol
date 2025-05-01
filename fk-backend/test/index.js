"use strict";

import test from "tape";
import request from "supertest";
import app from "../app.js";

test("Test POST /api/fingerprints", function (t) {
  let newFingerprint = {
    fingerprint: {
      jsonData: {
        customer_address: "0xef1c6e67703c7bd7107eed8303fbe6ec2554bf6b",
        user_agent_string:
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1",
        system_info: "info",
        os: "",
        cpu: "",
        browser_info: {
          name: "paul",
          version: "",
          build_number: "",
        },
        available_size: 1024,
        screen_size: {
          width: 1024,
          height: 768,
        },
      },
    },
  };

  request(app)
    .post("/api/fingerprints")
    .send(newFingerprint)
    .expect(200)
    .end(function (err, res) {
      t.error(err, "No error");
      t.same(
        res.body.jsonData.customer_address,
        newFingerprint.fingerprint.data.customer_address
      );
      t.same(
        res.body.jsonData.user_agent_string,
        newFingerprint.fingerprint.data.user_agent_string
      );
      t.end();
    });
});

test("Test POST /api/projects/keygen", function (t) {
  let metadata = {
    user_id: "12378",
    name: "a party",
  };

  // Regular expression to validate Base64 string
  function isBase64(str) {
    var base64Regex = /^[A-Za-z0-9+/=]+$/;
    return base64Regex.test(str);
  }

  request(app)
    .post("/api/projects/keygen/")
    .send(metadata)
    .expect(200)
    .end(function (err, res) {
      t.error(err, "No error");
      t.ok(res.body, "Req body is the key and it exists");
      t.ok(isBase64(res.body), "Req body is a valid base64 string");
      t.end();
    });
});
