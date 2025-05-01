module.exports = (function (){
	var ClassTemplate = require('./js/classTemplate')
	var FunctionTemplate = require('./js/functionTemplate')
	var ObjectTemplate = require('./js/objectTemplate')
	var NginxTemplate = require('./nginx/nginxConfTemplate');
	var create =function (name,testrunner,options){
		if (options['function']){
			return new FunctionTemplate(name,testrunner)
		}else if (options['object']){
			return new ObjectTemplate(name,testrunner)
		}else {
			return new ClassTemplate(name,testrunner)
		}
	}
	return {
		create:create
	}
})()