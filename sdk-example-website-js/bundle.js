'use strict';

var axios = require('axios');

try{
    pluginsLength = navigator.plugins.length;
    plugins=navigator.plugins;
     pluginNames=[];
    for(let i =0; i<pluginsLength;i++){
        pluginNames[i] = plugins[i].name;
    }
}catch(e){
    console.log(e.message);
}

var loc;
try{
   loc= document.referrer;
}catch( e){
    console.log(e.message);
}
var mem;
try{
   mem= navigator.deviceMemory;
}catch( e){
    console.log(e.message);
}
var agnt;
try{
   agnt= navigator.userAgent;
}catch( e){
    console.log(e.message);
}
var cores;
try{
    cores = navigator.hardwareConcurrency;
}catch( e){
    console.log(e.message);
}
var lang;
try{
    lang = navigator.language;
}catch( e){
    console.log(e.message);
}
var scale;
try{
    scale = window.devicePixelRatio;
}catch( e){
    console.log(e.message);
}

var encoding;
try{
     encoding = TextDecoder.encoding;
}catch( e){
    console.log(e.message);
}

var timeZone;
var date = new Date();
try{
    timeZone = date.getTimezoneOffset()/60;
}catch(e){
    console.log(e.message);
}


function udata() {
    return {
        data: {   
    location: loc,
    memory: mem,
    agent: agnt,
    cores: cores,
    language: lang,
    screen: scale,
    encoding: encoding,
    timeZone: timeZone
        }
}
}

class Lucia{

    constructor(options){
        this.clientId = options.clientId;
        this.baseURL = options.baseURL;
        this.api_key = options.api_key;
        this.data=udata();
    }

    async authenticate(){
        console.log('inside authenticate');
        const req = {
            user: this.clientId,
            key: this.api_key
        };
       const response = await axios.post(this.baseURL+'/api/key/auth',req);
       return response.status;
    }

}

module.exports = {
Lucia
};
