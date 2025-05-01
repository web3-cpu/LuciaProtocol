"use strict";

let assert = require("assert").strict;
let Parser = require("../app/Parser");
let parser = new Parser(process.argv);

if (parseInt(process.argv)){
  assert.deepEquals(parser.getPort(),3000);	
} 

if (typeof process.argv === 'undefined') {
  asert.deepEquals(parser.getPort(),3200);
}