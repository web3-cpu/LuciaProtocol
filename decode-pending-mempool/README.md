# README

Use this to deploy on hardware that's running a local node. 

You'll need to modify index.js

```js
const ethers = require("ethers");
require('dotenv').config()

// WEBSOCKET_URL should be wss://localhost:8546
const provider = new ethers.providers.WebSocketProvider(process.env.WEBSOCKET_URL)
console.log("provider: ",provider);
```