'use strict'
var expect = require('chai').expect;
var BlockTemplate = require('./blockTemplate')
describe('BlockTemplate constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var blockTemplate = new BlockTemplate({name: "server"});
      var f = blockTemplate.wrapWithBraces(blockTemplate.getLines());
      expect(f[0]).to.equal('server {')
    })

    it('should be able to change into an events block', function () {
    	var events = new BlockTemplate({
    		name: "events",

        worker_connections: 768
    	})
      console.log('events:', events);
		var f = events.wrapWithBraces(events.getLines());
		var lines = [ 'events {', '}' ];
		f.map((row,i) => {
			expect(row).to.equal(lines[i]);
		})

    })
  })
})
