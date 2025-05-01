module.exports = (function (){
	var BlockTemplate = require('./blockTemplate');
	var superClass = BlockTemplate.prototype;
	var method = EventTemplate.prototype = Object.create( superClass );
	method.constructor = EventTemplate;

	function EventTemplate(options) {
		var eventOptions = (options) ? options : {};
		eventOptions.name = options.name || "events";
		eventOptions.keyOrder = options.keyOrder || ['worker_connections'];
		superClass.constructor.call(this,eventOptions);
	}
	

	return EventTemplate;
})()
