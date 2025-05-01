
const http = require('http');
const fs = require('fs');

let html;
let welcome;
let css;
let js;
let lucia_js;
let bundle_b2;
let script;
let lc2;
let sdk;

fs.readFile('./index.html', function (err, data) {
  if (err) {
    throw err;
  }
  html = data;
});


fs.readFile('./welcome.html', function (err, data) {
  if (err) {
    throw err;
  }
  welcome = data;
});
fs.readFile('./index.css', function (err, data) {
  if (err) {
    throw err;
  }
  css = data;
});
fs.readFile('./index.js', function (err, data) {
  if (err) {
    throw err;
  }
  js = data;
});

fs.readFile('./bs-lucia.js', function (err, data) {
  if (err) {
    throw err;
  }
  lucia_js = data;
});

fs.readFile('./node_modules/luciasdk-test/lucia-sdk.js', function (err, data) {
  if (err) {
    throw err;
  }
  sdk = data;
});


fs.readFile('./bundle-b2.js', function (err, data) {
  if (err) {
    throw err;
  }
  bundle_b2 = data;
});

fs.readFile('./script.js', function (err, data) {
  if (err) {
    throw err;
  }
  script = data;
});

fs.readFile('./lucia-call2.js', function (err, data) {
  if (err) {
    throw err;
  }
  lc2 = data;
});

http.createServer((req, res) => {
  res.statusCode = 200;
if(req.url.indexOf('.css') != -1){
   res.writeHead(200, {'Content-Type': 'text/css'});
   res.write(css);
   res.end();
   return;
  }
  if(req.url.indexOf('index.js') != -1){
   res.writeHead(200, {'Content-Type': 'text/javascript'});
   res.write(js);
   res.end();
   return;
  }

  if(req.url.indexOf('bs-lucia.js') != -1){
    res.writeHead(200, {'Content-Type': 'text/javascript'});
     res.write(lucia_js);
     res.end();
     return;
    }

    if(req.url.indexOf('luciasdk-test/lucia-sdk.js') != -1){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
       res.write(sdk);
       res.end();
       return;
      }

    if(req.url.indexOf('script.js') != -1){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
       res.write(script);
       res.end();
       return;
      }
   
    if(req.url.indexOf('bundle-b2.js') != -1){
      res.writeHead(200, {'Content-Type': 'text/javascript'});
       res.write(bundle_b2);
       res.end();
       return;
      }

    if(req.url.indexOf('lucia-call2.js') != -1){
        res.writeHead(200, {'Content-Type': 'text/javascript'});
         res.write(lc2);
         res.end();
         return;
    }

    if(req.url.indexOf('welcome.html') != -1){
      res.writeHead(200, {'Content-Type': 'text/html'});
       res.write(welcome);
       res.end();
       return;
  }

res.writeHeader(200, {"Content-Type": "text/html"});
  res.write(html);
  res.end();
}).listen(8080);
