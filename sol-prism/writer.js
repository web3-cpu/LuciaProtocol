var fs = require('fs');
var path = require('path')
var templateFactory = require('./templates/templateFactory')
module.exports = (function (){
  function Writer(name,path,options){
    this.name = name;
    this.path = path 
    this.options = options
    this.testrunner = (options.chai) ? 'chai' : 'assert';
    this.template  = templateFactory.create(this.name,this.testrunner,this.options)//new BaseTemplate(this.name,this.testrunner,options)
    this.template.init()
  }

  //private method
  Writer.prototype.save = function (type){
    var templateType = (type == 'module') ? this.template.module : this.template.moduleSpec
    var fileName = (type === 'module') ? this.name + '.js' : this.name + '.spec.js';
    var ws = fs.createWriteStream(this.path + '/' + fileName);
    ws.on('error', function(err) { 
      console.error("err: ",err)/* error handling */ 
    });
    var arr = templateType.lines
    arr.forEach(function(str) { 
      ws.write(str+ '\n'); 
    });
    ws.end();
  }

  Writer.prototype.writeModule = function (){
  	this.save('module')
    return this;
	}

  Writer.prototype.writeModuleSpec = function (){
    this.save('moduleSpec')
    return this;
  }
  return Writer
})()
