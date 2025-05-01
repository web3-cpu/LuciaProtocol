"use strict";

let expect = require('chai').expect;
let ServerTemplate = require('./serverTemplate');
let readfile = require('../../readonlyfile.json');

let domainurl = readfile.domainurl;
let privkeydir = readfile.privkeydir;
let thedomain = readfile.thedomain;

describe('ServerTemplate constructor',function (){
  describe('Prototype methods',function (){
    let serverTemplate = new ServerTemplate({
	  	listen: 443,
	  	domain: thedomain + ".com",
	  	host: thedomain,
	  	passenger_app_root: "/var/www/" + thedomain + "/current",
	  	passenger_startup_file: "server.js"
	  });
	  

    it('should say create a server block',function (){
    	let lines = serverTemplate.getLines();
      let result = serverTemplate.wrapWithBraces(lines);
      let lines = [ 'server {',
			  '  listen 443 ssl;',
			  '  server_name ' + thedomain, // space incl on purpose
			  '  ssl_certificate /etc/letsencrypt/live/' + domainurl,
			  '  ssl_certificate_key /etc/letsencrypt/live/' + privkeydir,
			  '  root /var/www/'+ thedomain + '/current;',
			  '  passenger_enabled on;',
			  '  passenger_app_type node;',
			  '  passenger_app_root /var/www/' + thedomain + '/current;',
			  '  passenger_startup_file server.js;',
			  '}' ];
			result.map((row,i) => {
				expect(row).to.equal(lines[i]);
			})
    });

    it('should build sub server class',function (){
      let f = serverTemplate.buildForwarder();
      let result = f.wrapWithBraces(f.getLines())
      let lines = [ 'server {',
		  '  listen 80;',
		  '  return 301 https://$host$request_uri;',
		  '}' ];
       	result.map((row,i) => {
				expect(row).to.equal(lines[i]);
			})
    });
  })
})


