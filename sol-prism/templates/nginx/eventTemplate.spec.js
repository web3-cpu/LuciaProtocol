"use strict";
var expect = require('chai').expect;
var EventTemplate = require('./eventTemplate')
describe('EventTemplate constructor',function (){
  describe('Prototype methods',function (){
    

    it('should be able to change into an events block', function () {
    	var events = new EventTemplate({
        worker_connections: 768
    	})
		  var f = events.wrapWithBraces();
		  var lines = [ 'events {', '  worker_connections 768;', '}' ];
    
  		f.map((row,i) => {
  			expect(row).to.equal(lines[i]);
  		})

    })
  })
})
