"use strict";
var expect = require('chai').expect;
var Dragon = require('./dragon');
describe('Dragon constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var dragoon = new Dragon();
      expect(randomizer.sayHello()).to.equal('hello')
    })
  })
})
