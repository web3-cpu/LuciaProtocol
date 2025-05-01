module.exports = (function (){
	var BlockTemplate = require("./blockTemplate");
	var superClass = BlockTemplate.prototype;
	var method = HttpTemplate.prototype = Object.create( superClass );
	method.constructor = HttpTemplate;

	function HttpTemplate(options) {
		var httpOptions = (options) ? options : {};
		httpOptions.name = options.name || "http";
		httpOptions.keyOrder = options.keyOrder || ['access_log','error_log','passenger_root','passenger_ruby','sendfile','tcp_nopush','tcp_nodelay','keepalive_timeout','types_hash_max_size','include','default_type'];
		superClass.constructor.call(this,httpOptions);
		this.children = options.children || [];
		this.build();
	}

	HttpTemplate.prototype.build = function () {
		this.block = {
			[this.name]: {
			  access_log: '/var/log/nginx/access.log',
			  error_log: '/var/log/nginx/error.log',
			  
			  passenger_root: '/usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini',
			  passenger_ruby: '/usr/bin/passenger_free_ruby',
			  sendfile: 'on',
			  tcp_nopush: 'on',
			  tcp_nodelay: 'on',
			  keepalive_timeout: 65,
			  types_hash_max_size: 2048,

			  include: '/etc/nginx/mime.types',
			  default_type: 'application/octet-stream'
			}
		}
	}


	HttpTemplate.prototype.wrapWithBraces = function (lines) {
		if (this.children.length === 0) {
			return superClass.wrapWithBraces.call(this,lines);	
		}
		var childLines = this.children
			.map(child => child.wrapWithBraces(child.getLines()))
			.reduce((a,b) => a.concat(b), [])
			.map(row => '  ' + row)
		return superClass.wrapWithBraces.call(this,lines.concat(childLines))
	}


	return HttpTemplate;	
})()

