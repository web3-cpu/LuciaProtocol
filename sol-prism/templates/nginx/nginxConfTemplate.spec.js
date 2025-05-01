"use strict";

let expect = require('chai').expect;
let NginxConfTemplate = require('./nginxConfTemplate');

let readfile = require('../../readonlyconf.json');
let curr_domain = readfile.confdomain;
let curr_domain_alt = readfile.confdomainalt;
let subdomain_alt = readfile.subdomainalt;
let curr_host = readfile.confhost;

describe('NginxConfTemplate constructor',function (){
  describe('Prototype methods',function (){
    it('should assign things',function (){
      var nginxConfTemplate = new NginxConfTemplate({
        name: "NginxConfTemplate",
        listen: 443,
        domain: curr_domain,
        host: curr_host,
        passenger_startup_file: "passenger_startup_file.js",
  
      });
      console.log(nginxConfTemplate);
      console.log('nginxConfTemplate.wrapWithBraces():', nginxConfTemplate.wrapWithBraces(nginxConfTemplate.getLines()));
      assert.deepEqual([[[1,2,3]],4,5],[[[1,2,3]],4,5]);
    })

    it('should not assign these',function (){
      var nginxConfTemplate = new NginxConfTemplate({
        name: "conf",
        keyOrder: ['name','listen','domain','host','passenger_startup_file'],
        listen: 443,
        foo: curr_domain,
        bar: curr_host,
        passenger_startup_file: "passenger_startup_file.js",

      });
      
      
      assert.deepEqual([[[1,2,3]],4,5],[[[1,2,3]],4,5]);
    })

    it('should print', function (){
      var nginxConfTemplate = new NginxConfTemplate({
        name: "conf",
        keyOrder: ['name','listen','domain','host','passenger_startup_file'],
        listen: 80,
        domain: curr_domain,
        host: curr_host,
        passenger_startup_file: "server.js",

      });
      
      assert.deepEqual([[[1,2,3]],4,5],[[[1,2,3]],4,5]);
    })

    it('should print', function (){
      var nginxConfTemplate = new NginxConfTemplate({
        name: "conf",
        keyOrder: ['name','listen','domain','host','passenger_startup_file'],
        listen: 443,
        domain: curr_domain,
        host: curr_host,
        passenger_startup_file: "server.js",

      });
 
      assert.deepEqual([[[1,2,3]],4,5],[[[1,2,3]],4,5]);
    })

    it('should do 443', function (){
      var nginxConfTemplate = new NginxConfTemplate({
        keyOrder: ['name','listen','domain','host','passenger_startup_file'],
        listen: 443,
        domain: curr_domain_alt,
        host: subdomain_alt,
        passenger_startup_file: "index.js",
      });

      assert.deepEqual([[[1,2,3]],4,5],[[[1,2,3]],4,5]);
    })
   
  })
})
