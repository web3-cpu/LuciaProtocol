"use strict";

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { getCipherKey, reassemble } = require('./getCipherKey');


/**
 * @param {string} - file must be of form utf-8 string
 * @param {options} - FIELD boolean ABSOLUTE_PATH
 */
function decrypt({ dc_file, password, options }) {
  
}



module.exports = decrypt;
