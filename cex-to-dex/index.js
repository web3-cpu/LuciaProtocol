const {Kraken} = require("node-kraken-api");
const express = require("express");
const app = express();
require("dotenv").config();
const key = process.env.KRAKEN_API_KEY;
const privKey = process.env.KRAKEN_PRIVATE_KEY;


const myOTP = "892503";
// Instantiate
const kraken = new Kraken({ 
	key: key, 
	secret: privKey, 
	genotp: () => myOTP,
	gennonce: () => 5
});




app.get("/", function (req,res) {
	(async () => {
		const ticker = await kraken.ticker({ pair: "XXBTZUSD" })
		console.log("ticker: ",ticker);

	})();
})

app.get("/private", function (req,res) {
	(async () => {
		const response = await kraken.balance();
		console.log("response: ",response);	
	})()
	
})

app.listen(3000, function (){
	console.log("Server is running on port: ",3000);
})