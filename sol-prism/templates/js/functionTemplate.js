module.exports = (function (){
	var superClass = require("../baseTemplate").prototype;
    var method = FunctionTemplate.prototype = Object.create( superClass );
	method.constructor = FunctionTemplate;

	String.prototype.setLowercase = function() {
	    return this.charAt(0).toLowerCase() + this.slice(1);
	}

	function FunctionTemplate(name,testrunner){
		superClass.constructor.apply( this, arguments );
		this.formattedName = name.setLowercase()
		if (this.testrunner == 'assert'){
			this.verificationLine = "assert.equal("+ "'My Life for Auir!'"+", "+this.name+"());"
		}else {
			this.verificationLine = "expect("+ this.name+ "()).to.equal('My Life for Auir!')"
		}
	}
	FunctionTemplate.prototype._createModule = function (){
		this.module =  {
			dependencies: '',
			lines: [
				"module.exports = (function (){",
				"  function "+this.formattedName+"(){",
				"  " + "  " + "return 'My Life for Auir!'",
				"  }", 
				"  ",
				"  return " + this.formattedName,
				"})()"
			]
		}
		return this
	}

	FunctionTemplate.prototype._createModuleSpec = function (){
		this.moduleSpec = {
			dependencies: '',
			lines: [
				"'use strict'", 
				this.requireLine,
				"var "+this.formattedName+" = require('./" + this.name + "')",
				"describe('"+this.formattedName+" function',function (){",
				"  describe('General case',function (){",
				"    it('should say hello',function (){",
				"      " + this.verificationLine,
				"    })",
				"  })",
				"})"
			]
		}
		return this
	}

	return FunctionTemplate
})()
	