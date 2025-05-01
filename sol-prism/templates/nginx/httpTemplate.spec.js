'use strict'
var expect = require('chai').expect;
var HttpTemplate = require('./httpTemplate')
var ServerTemplate = require('./serverTemplate');
describe('HttpTemplate constructor',function (){
  describe('Prototype methods',function (){
    it('should say hello',function (){
      var httpTemplate = new HttpTemplate({});
      var f = httpTemplate.wrapWithBraces(httpTemplate.getLines());
      var lines = [ 'http {',
	  '  access_log /var/log/nginx/access.log;',
	  '  error_log /var/log/nginx/error.log;',
	  '  passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;',
	  '  passenger_ruby /usr/bin/passenger_free_ruby;',
	  '  sendfile on;',
	  '  tcp_nopush on;',
	  '  tcp_nodelay on;',
	  '  keepalive_timeout 65;',
	  '  types_hash_max_size 2048;',
	  '  include /etc/nginx/mime.types;',
	  '  default_type application/octet-stream;',
	  '}' ];
	  f.map((row,i) => {
	  	expect(row).to.equal(lines[i])
	  });
    })

    it('should print children',function (){
      var serverTemplate1 = new ServerTemplate({
	  	listen: 443,
	  	domain: "myspace.com",
	  	host: "myspace",
	  	passenger_app_root: "/var/www/myspace/current",
	  	passenger_startup_file: "server.js"
	  });
	  var serverTemplate2 = serverTemplate1.buildForwarder();
      var httpTemplate = new HttpTemplate({
      	children: [serverTemplate2,serverTemplate1]
      });
      var f = httpTemplate.wrapWithBraces(httpTemplate.getLines())
      var lines = [ 'http {',
		  '  access_log /var/log/nginx/access.log;',
		  '  error_log /var/log/nginx/error.log;',
		  '  passenger_root /usr/lib/ruby/vendor_ruby/phusion_passenger/locations.ini;',
		  '  passenger_ruby /usr/bin/passenger_free_ruby;',
		  '  sendfile on;',
		  '  tcp_nopush on;',
		  '  tcp_nodelay on;',
		  '  keepalive_timeout 65;',
		  '  types_hash_max_size 2048;',
		  '  include /etc/nginx/mime.types;',
		  '  default_type application/octet-stream;',
		  '  server {',
		  '    listen 80;',
		  '    return 301 https://$host$request_uri;',
		  '  }',
		  '  server {',
		  '    listen 443 ssl;',
		  '    server_name myspace.com;',
		  '    ssl_certificate /etc/letsencrypt/live/myspace.com/fullchain.pem;',
		  '    ssl_certificate_key /etc/letsencrypt/live/myspace.com/privkey.pem;',
		  '    root /var/www/myspace/current;',
		  '    passenger_enabled on;',
		  '    passenger_app_type node;',
		  '    passenger_app_root /var/www/myspace/current;',
		  '    passenger_startup_file server.js;',
		  '  }',
		  '}' ]
	  f.map((row,i) => {
	  	console.log(row);
	    expect(row).to.equal(lines[i])
	  });
    })
  })
})
