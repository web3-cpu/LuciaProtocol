import base62 from "base62/lib/ascii.js";
import { createHash } from "node:crypto";

export const generateLink = (targetLink, platform, channel, alias) => {
  var inputString = "";

  if (alias === null || alias === undefined || alias.length === 0) {
    inputString = [targetLink, platform, channel, new Date()].join("");

    console.log(inputString);
    const hex = createHash("sha256").update(inputString).digest("hex");

    var randomPre = Math.random() * (25 - 0) + 0;
    var randomPost = Math.random() * (31 - 7) + 7;
    var pre = hex.toString().slice(randomPre, randomPre + 7);
    var post = hex.toString().slice(randomPost - 7, randomPost);
    var dec = parseInt("" + pre + post, 16);
    const link = base62.encode(dec);
    return link;
  } else {
    inputString = alias;
    return alias;
  }
};
