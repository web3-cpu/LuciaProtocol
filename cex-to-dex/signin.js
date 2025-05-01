// This file to be merged in to index.js once authentication with MFA is working
require("dotenv").config();
const api_url = 'https://api.kraken.com';
const api_key = process.env.KRAKEN_API_KEY;


// Private Key	kQH5HW/8p1uGOVjbgWA7FunAmGO8lsSUXNsu3eow76sz84Q18fWxnyRzBHCd3pd5nE9qa99HAZtuZuj6F1huXg==
// Nonce	1616492376594
const privKey = process.env.KRAKEN_PRIVATE_KEY;
const nonce = 1; // if 1 doesn't work then use 1616492376594
let encoded_payload	= "nonce=1&ordertype=limit&pair=XBTUSD&price=37500&type=buy&volume=1.25";

const crypto = require('crypto');
const qs     = require('qs');


// message signature is also known as API-Sign
const getMessageSignature = (path, request, secret, nonce) => {
    const message       = qs.stringify(request);
    const secret_buffer = new Buffer(secret, 'base64');
    const hash          = new crypto.createHash('sha256');
    const hmac          = new crypto.createHmac('sha512', secret_buffer);
    const hash_digest   = hash.update(nonce + message).digest('binary');
    const hmac_digest   = hmac.update(path + hash_digest, 'binary').digest('base64');

    return hmac_digest;
};

const axios = require('axios');

axios.get('https://api.kraken.com/0/public/Time')
  .then(response => {
    console.log(response.data); // Output the received JSON data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


// Function to make a Kraken API request
async function krakenRequest(uri_path, data, api_key, privKey) {
  const nonce = String(Math.floor(new Date().getTime() / 1000)); // Get current timestamp as nonce
  const methodSignature = getMessageSignature(uri_path, JSON.stringify(data), privKey, nonce);
  console.log("methodSignature: ",methodSignature);
  const headers = {
    'API-Key': api_key,
    'API-Sign': methodSignature
  };

  try {
    const response = await axios.post(api_url + uri_path, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Error making Kraken API request:', error);
  }
}

// Construct the request and print the result
const myNonce = String(Math.floor(new Date().getTime() / 1000))
const myOTP = "298101"
console.log("myNonce: ",myNonce);
krakenRequest('/0/private/Balance', { nonce: myNonce, otp: myOTP }, api_key, privKey)
  .then(response => {
    console.log(response); // Output the API response
  })
  .catch(error => {
    console.error('Error:', error);
  });

let test_uri_path = "/0/private/AddOrder";
let test_data_en = "nonce=1616492376594&ordertype=limit&pair=XBTUSD&price=37500&type=buy&volume=1.25";
let test_private_key = "kQH5HW/8p1uGOVjbgWA7FunAmGO8lsSUXNsu3eow76sz84Q18fWxnyRzBHCd3pd5nE9qa99HAZtuZuj6F1huXg=="
let test_nonce = "1616492376594";

let test_data_de = {
    "nonce": "1616492376594", 
    "ordertype": "limit", 
    "pair": "XBTUSD",
    "price": 37500, 
    "type": "buy",
    "volume": 1.25
}

test(
	test_uri_path,
	test_data_de,
	test_private_key,
	test_nonce
);


function test(test_uri_path,test_data,test_private_key,test_nonce) {
	let actual_result = getMessageSignature(test_uri_path,test_data,test_private_key,test_nonce);
	let expected_result = "4/dpxb3iT4tp/ZCVEwSnEsLxx0bqyhLpdfOpc6fn7OR8+UClSV5n9E6aSS8MPtnRfp32bAb0nmbRn6H8ndwLUQ==";
	console.log("actual result: ",actual_result);
	console.log("expected_result: ",expected_result);
}