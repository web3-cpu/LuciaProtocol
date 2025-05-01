module.exports = (function (){
	var superClass = require("../baseTemplate").prototype;
    var method = ClassTemplate.prototype = Object.create( superClass );
	method.constructor = ClassTemplate;

	function ClassTemplate(name,testrunner){
		superClass.constructor.apply( this, arguments );
	}

	return ClassTemplate
})()
	