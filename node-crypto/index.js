let encrypt = require("./encrypt.js");
let plaintext = {'file': './static/logins.csv','password':'mypassword4', 'options': {'dirname': './out/'}};



/**
 * Function takes in a directory path and changes it to go up one level and 
 * sets the output directory to "out"
 * @param {string} - Such as './static/logins.csv'
 *
 */ 
function changeDirectory() {}



/**
 * Wraps object so that one can call .chain() operations on the
 * returned wrapped object
 * 
 * @param {string}
 * @return {Object}
 */ 
function IChainable(){}



/**
 * Fans out a directory path into 3 parts then pieces it back together
 * where the word in the last position is moved to the head
 * and during that process a substring is appended to the head
 * 
 * @param {string}
 * @return {string}
 */ 
function rearrange(filepath) {}

// EXAMPLE METHOD CALL
// rearrange('./static/logins.csv.enc');




