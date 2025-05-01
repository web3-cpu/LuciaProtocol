"use strict"; 

let parser = require('./parser');
let expect = require("chai").expect;
describe("Parser independent test suite",function (){
	describe("Parser#validate",function (){
		it("should parse options properly",function (){
			var parser = new Parser()
			parser.parseResults = initSampleData()
		})
	})	


})

function initSampleData(){
	return { function: true,
      object: true,
      class: true,
      _order: 
       [ { key: 'function', value: true, from: 'argv' },
         { key: 'object', value: true, from: 'argv' },
         { key: 'class', value: true, from: 'argv' } ],
      _args: [] }
}
