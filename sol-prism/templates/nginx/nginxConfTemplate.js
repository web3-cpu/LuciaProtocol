module.exports = (function (){
	
	var BlockTemplate = require('./blockTemplate');
	var EventTemplate = require('./eventTemplate');
	var superClass = BlockTemplate.prototype;
	var method = NginxConfTemplate.prototype = Object.create( superClass );
	method.constructor = NginxConfTemplate;


	var ServerTemplate = require('./ServerTemplate');
    var HttpTemplate = require('./HttpTemplate');

	function NginxConfTemplate(options) {
		var nginxOptions = (options) ? options : {};
		nginxOptions.name = options.name || "conf";
		nginxOptions.keyOrder = options.keyOrder || ['name','listen','domain','host','passenger_startup_file'];
		superClass.constructor.call(this,nginxOptions);
	}

	// this is for testing purposes, to be moved to separate template
	/**
	 * @param dest {string} - can be a url or an address
	 */
	NginxConfTemplate.prototype.createQR = function (dest) {
		// set encoding 
		// create upper left quadrant of matrix
		// create lower left quadrant of matrix by flipping it
		// same concept for upper right
		// create diagonal by applying transpose 
	}

	

	NginxConfTemplate.prototype.print = function() {
		var header = ['user www-data;',
			'worker_processes 4;',
			'pid /run/nginx.pid;'
		];
		
		var events = new EventTemplate({
			name: "events",
			worker_connections: 768
		})



		// port,domain,host,passenger_app_root, passenger_startup_file
		var server = new ServerTemplate({
			listen: this.block[this.name].listen,
			domain: this.block[this.name].domain,
			host: this.block[this.name].host,
			passenger_app_root: this.block[this.name].passenger_app_root,
			passenger_startup_file: this.block[this.name].passenger_startup_file
		});

		// takes no options, all default values
		var http = new HttpTemplate({
			children: (this.block[this.name].listen !== 443) ? [server] : [server.buildForwarder(),server]
		});

		var res =[header,[' '],events.wrapWithBraces(),[' '],http.wrapWithBraces(http.getLines())].reduce((a,b) => a.concat(b), [])
		return res;
	}

	return NginxConfTemplate
})()
	