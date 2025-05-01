module.exports = (function (){
	var superClass = require("../baseTemplate").prototype;
    var method = ObjectTemplate.prototype = Object.create( superClass );
	method.constructor = ObjectTemplate;
	String.prototype.setLowercase = function() {
	    return this.charAt(0).toLowerCase() + this.slice(1);
	}

	function ObjectTemplate(name,testrunner){
		superClass.constructor.apply( this, arguments );
		this.formattedName = name.setLowercase()
	}

	ObjectTemplate.prototype._createModule = function (){
		this.module =  {
			dependencies: '',
			lines: [
				"module.exports = (function (){",
				"  var "+this.formattedName+" = {};", 
				"  ",
				"  " + this.formattedName + ".sayHello = function (){",
				"  " + "  " + "return 'My Life for Auir!'",
				"  }",
				"  return " + this.formattedName,
				"})()"
			]
		}
		return this
	}

	ObjectTemplate.prototype._createModuleSpec = function (){
		this.moduleSpec = {
			dependencies: '',
			lines: [
				"'use strict'", 
				this.requireLine,
				"var "+this.formattedName+" = require('./" + this.name + "')",
				"describe('"+this.formattedName+" object literal',function (){",
				"  describe('Property functions',function (){",
				"    it('should say hello',function (){",
				"      " + this.verificationLine,
				"    })",
				"  })",
				"})"
			]
		}
		return this
	}

	return ObjectTemplate
})()
	