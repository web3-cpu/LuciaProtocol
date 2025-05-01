let readfile = require('../../readonlyfile.json');
let myowneddomain = readfile.owneddomain;
module.exports = (function (){
	var BlockTemplate = require("./blockTemplate");
	var superClass = BlockTemplate.prototype;
	var method = ServerTemplate.prototype = Object.create( superClass );
	method.constructor = ServerTemplate;

	/**
	 * Specification: omits add_header: Strict-Transport-Security “max-age=31536000”; 
	 * Means can only be accessible from https not http
	 */
	function ServerTemplate(options) {
		this.name = "server";
		this.listen = options.listen; // port, 443 or 80
		this.domain = options.domain || myowneddomain;
		this.host = options.host || this.domain.split('.')[0];
		this.passenger_app_root = options.passenger_app_root || '/var/www/' + this.host + '/current';
		this.passenger_startup_file = options.passenger_startup_file || 'server.js';
		this.return = options.return;
		this.build();
		
		
	}

	ServerTemplate.prototype.build = function () {
		var sslString = (this.listen === 443) ? " ssl" : "";
		this.block = {
			[this.name]: {
			    listen: this.listen + sslString,
			    server_name: this.domain,
			    ssl_certificate: "/etc/letsencrypt/live/"+ this.domain + "/fullchain.pem",
			    ssl_certificate_key: "/etc/letsencrypt/live/" + this.domain + "/privkey.pem",
			    
			    root: this.passenger_app_root,
			    passenger_enabled: 'on',
			    passenger_app_type: 'node',
			    passenger_app_root: this.passenger_app_root,
			    passenger_startup_file: this.passenger_startup_file    
			 }
		}
	}


	ServerTemplate.prototype.getKeys = function (sslOn){
		var keys = ['listen','server_name','ssl_certificate','ssl_certificate_key','root','passenger_enabled','passenger_app_type','passenger_app_root','passenger_startup_file'];
		return sslOn ? keys.filter(keys => keys.indexOf('ssl_cert') === -1) : keys
	}

	ServerTemplate.prototype.getLines = function() {
		return superClass.getLines.call(this,this.getKeys());
	}

	
	ServerTemplate.prototype.buildForwarder = function () {
		var block = new BlockTemplate({name: this.name});
		block.set('listen',80);
		block.set('return',"301 https://$host$request_uri");
		return block;
		
	}

	return ServerTemplate;	
})()
