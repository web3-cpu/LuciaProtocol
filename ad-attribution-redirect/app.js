const express = require("express");
const app = express();
const path = require("path");
var bodyParser = require("body-parser");
var url = require("url");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();
const backend_url = process.env.BACKEND_URL;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
//app.set("view engine", "html");
app.set("views", path.join(__dirname, "public"));

let script;

fs.readFile("./public/data.js", function (err, data) {
  if (err) {
    throw err;
  }
  script = data;
});

app.use("/", function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var ip = req.headers["x-real-ip"];
  //getIPAddress(req);
  //if (!pathname) res.status(404).send("404 Not Found");
  console.log("pathname ===> ", pathname);
  console.log("ip ===> ", ip);
  if (req.url.indexOf("data.js") != -1) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    res.write(script);
    res.end();
    return;
  }
  // res.writeHeader(200, { "Content-Type": "text/html" });
  console.log(pathname);

  if (req.url.indexOf("error.html") != -1 || !pathname) {
    res.render(path.join("error.html"));
    res.end();
    return;
  }
  res.render(path.join("index.html"), {
    path: pathname,
    ip: ip,
    backend: backend_url,
  });
  res.end();
});

function getIPAddress(req) {
  const clientIP =
    req.headers["x-forwarded-for"]?.split(",").shift() ||
    req.socket?.remoteAddress;
  const repIP = req.ip;

  if (repIP === clientIP || repIP) {
    return repIP;
  } else if (clientIP) {
    return clientIP;
  } else {
    return "";
  }
}

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
