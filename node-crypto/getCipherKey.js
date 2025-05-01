"use strict"; 

const crypto = require('crypto');
function getCipherKey(password) {
  return crypto.createHash('sha256')
    .update(password)
    .digest();
}

function getCipherKey(password) {
  return crypto.createHash('sha256')
    .update(password)
    .digest();
}

function getCipherKeyAsync(password) {
  return new Promise(function (resolve,reject) {
    let resolver = crypto.createHash('sha256')
      .update(password);
    return resolve(resolver.digest());  
  })  
}

function hexWithPrefix(number) {
  return '0x' + number.toString(16);
}


/**
 * @description Transform an integer into its hexadecimal value 
 */
function intToHex(integer) {
  if (integer < 0) {
    throw new Error('Invalid integer as argument, must be unsigned!')
  }
  const hex = integer.toString(16)
  return hex.length % 2 ? `0${hex}` : hex
}


function byteToHex(n) {
  let nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}



function ende(arr) {
  return arr.map(function (a) {
    return a;
  }).pop();
}


/**
 * @description Removes the tail and reattaches the head
 * @param {string}
 * @return 
 */
function dissect(fileStream,options) {
  let { IS_SLASH } = options;
  let delimiter = IS_SLASH ? '/' : '.';
  let split = fileStream.split(delimiter);
  let tail = ende(split);
  let head = `un${tail}`;
  let fileDes = split.unshift(head);
  let fileDescriptor = split.join(delimiter);
  return fileDescriptor;
}


/**
 * @description Split slashes first then dots
 * @param dcStore {string} - such as 
 * @return
 */ 
function reassemble(dcStore) {
  let split = dcStore.split("/");
  let file = ende(split);
  let updatedFile = dissect(file,{isSLASH: false});
  return updatedFile;
}


module.exports = {
  getCipherKey,
  getCipherKeyAsync,
  hexWithPrefix,
  intToHex,
  byteToHex,
  ende,
  dissect,
  reassemble
};
