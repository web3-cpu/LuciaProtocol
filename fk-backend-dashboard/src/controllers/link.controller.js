import { generateLink } from "../util/generate.js";
import { Generated_link } from "../models/GeneratedLink.js";
import { Client } from "../models/Client.js";
import { Campaign } from "../models/campaign.js";
import "dotenv/config";

const env = process.env.NODE_ENV;
var prefix;

if (env === "dev") {
  prefix = "http://localhost:3001/";
} else if (env === "production") {
  prefix = "https://libqc.org/";
} else if (env === "staging") {
  prefix = "https://staging.api.clickinsights.xyz/redirect/";
}

export const link = async (req, res, err) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }

  if (!req.body || !req.body.target || req.body.target == null) {
    console.error("Missing mandatory fields");
    res.status(400).json({ message: "Mandatory field is missing" });
  } else if (!isValidUrl(req.body.target)) {
    console.error("Invalid target URL");
    res.status(400).json({ message: "Invalid target URL" });
  } else {
    var { genLink, alias } = generateCall(req);
    const client = req.me;
    const exists = await Generated_link.findOne({
      where: {
        link: prefix + genLink,
      },
    });
    if (exists === null) {
      const link = await Generated_link.create({
        link: prefix + genLink,
        target: req.body.target,
        alias: alias,
        client_id: client.id,
      });

      res.status(200).send({
        done: true,
        link: prefix + genLink,
      });
    } else {
      res.status(409).json({
        message: "Alias already exists, retry with a different entry",
      });
    }
  }
};

export const campaign = async (req, res, err) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }

  if (
    !req.body ||
    !req.body.target ||
    req.body.target == null ||
    (req.body.channel != null && req.body.platform == null)
  ) {
    console.error("Missing mandatory fields");
    res.status(400).json({ message: "Mandatory field is missing" }).send();
  } else if (!isValidUrl(req.body.target)) {
    console.error("Invalid target URL");
    res.status(400).json({ message: "Invalid target URL" });
  } else {
    const client = req.me;
    //check db for user authentication and correct API key mapping
    var { genLink, alias } = generateCall(req);
    const exists = await Generated_link.findOne({
      where: {
        link: prefix + genLink,
      },
    });
    if (exists === null) {
      let platformQ =
        !req.body.platform || req.body.platform === null
          ? ""
          : req.body.platform.toLowerCase();
      let cName =
        !req.body.name || req.body.name === null
          ? ""
          : req.body.name.toLowerCase();
      let description =
        !req.body.description || req.body.description === null
          ? ""
          : req.body.description.toLowerCase();
      let cost = !req.body.cost || req.body.cost === null ? 0 : req.body.cost;

      const gl = await Generated_link.create({
        link: prefix + genLink,
        target: req.body.target,
        alias: alias,
        client_id: client.id,
      });
      if (platformQ !== "") {
        const cmp = await Campaign.create({
          name: cName,
          description: description,
          generated_link_id: gl.id,
          platform: platformQ,
          client_id: client.id,
          cost: cost,
        });
      } else {
        const cmp = await Campaign.create({
          name: cName,
          description: description,
          generated_link_id: gl.id,
          client_id: client.id,
          cost: cost,
        });
      }
      res.status(200).send({
        done: true,
        link: prefix + genLink,
      });
    } else {
      res
        .status(409)
        .json({
          message: "Alias already exists, retry with a different entry",
        })
        .send();
    }
  }
};
function generateCall(req) {
  if (!req.body.alias || req.body.alias == null) {
    var alias = false;
  } else {
    alias = true;
  }
  const genLink = generateLink(
    req.body.target,
    req.body.platform,
    req.body.channel,
    req.body.alias
  );
  return { genLink, alias };
}

function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (env === "dev") {
    console.log(
      "Will the URL",
      urlString,
      " work in prod?",
      urlPattern.test(urlString)
    );
    return true;
  } else if (env === "production" || env === "staging") {
    // validate fragment locator
    return urlPattern.test(urlString);
  }
}
