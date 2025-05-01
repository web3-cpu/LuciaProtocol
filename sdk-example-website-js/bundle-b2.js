//import axios from 'axios';
//  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
var pluginsLength;
var plugins;
var pluginNames;

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

var screenWidth
try{
    screenWidth=window.screen.width;
}catch(e){
    console.log(e.message)
}
var screenheight
try{
    screenheight=window.screen.height;
}catch(e){
    console.log(e.message)
}

var navPer
try{
    navPer = navigator.permissions.webglVersion
}catch(e){
    console.log(e.message)
}

var renderedPer
try{
    renderedPer= navigator.permissions.RENDERER
}catch(e){
    console.log(e.message)
}

var geoPer
try{
    geoPer = navigator.permissions.geolocation
}catch(e){
    console.log(e.message)
}

var availHeight

try{
    availHeight=window.screen.availHeight
}catch(e){
    console.log(e.message)
}

var availWidth
try{
    availWidth=window.screen.availWidth
}catch(e){
    console.log(e.message)
}

var screenOrientationType
try{
    screenOrientationType= screen
    .orientation
    .type
}catch(e){
    console.log(e.message)
}

var screenOrientationAngle
try{
    screenOrientationAngle= screen
    .orientation
    .angle
}catch(e){
    console.log(e.message)
}


// canvas

const canvas = document.createElement('canvas');
canvas.id = 'canvasLucia';
const ctx = canvas.getContext("2d");
ctx.fillStyle = "rgb(255,0,255)";
ctx.beginPath();
ctx.rect(20, 20, 150, 100);
ctx.fill();
ctx.stroke();
ctx.closePath();
ctx.beginPath();
ctx.fillStyle = "rgb(0,255,255)";
ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
ctx.fill();
ctx.stroke();   
ctx.closePath();

var txt = 'abz190#$%^@£éú';
ctx.textBaseline = "top";
ctx.font = '17px "Arial 17"';
ctx.textBaseline = "alphabetic";
ctx.fillStyle = "rgb(255,5,5)";
ctx.rotate(.03);
ctx.fillText(txt, 4, 17);
ctx.fillStyle = "rgb(155,255,5)";
ctx.shadowBlur=8;
ctx.shadowColor="red";
ctx.fillRect(20,12,100,5);
var src =  canvas.toDataURL();
const hVal = hash(src);

// canvas
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
    timeZone: timeZone,
    plugins: plugins,
    pluginsLength: pluginsLength,
    pluginNames:pluginNames,
    screenWidth:screenWidth,
    screenheight:screenheight,
    navPer:navPer,
    renderedPer:renderedPer,
    geoPer:geoPer,
    availHeight:availHeight,
    availWidth:availWidth,
    screenOrientationType:screenOrientationType,
    screenOrientationAngle:screenOrientationAngle,
    uniqueHash:hVal,
    src:src
        }
}
}

function hash(string) {
    try{
    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((bytes) => bytes.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
}catch(e){
    console.log(e.message)
}
}

export default class Lucia{

    constructor(options){
        this.clientId = options.clientId;
        this.baseURL = options.baseURL;
        this.api_key = options.api_key;
        this.data=udata();
    }

    async authenticate(){
        console.log('inside authenticate');
        const headers = {
            'Content-Type': 'application/json'
          }
        const req = {
            user: this.clientId,
            key: this.api_key
        };
    //    const response = await axios.post(this.baseURL+'/api/key/auth',req,{
    //     headers:headers
    //    }).then((response)=>{
    //     console.log(response)
    //    }).catch((error)=>{
    //     console.error(error)
    //    });

       await fetch(this.baseURL+'/api/key/auth',{
        method:'POST',
        headers:headers,
        body: JSON.stringify(req)
       }).then((response)=>{
        console.log(response)
       }).catch((error)=>{
        console.error(error)
       });

    }

    async userInfo(user){
        console.log('adding user information')
        const headers = {
            'Content-Type': 'application/json',
            // 'Authorization': 'auth'
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Credentials': true
          }
        const req={
            client: this.clientId,
            user: {name: user,
            data: this.data}
        }

        // const response = await axios.post(this.baseURL+'/api/sdk/user',req,{
        //     headers:headers
        //    }).then((response)=>{
        //     console.log(response)
        //    }).catch((error)=>{
        //     console.error(error)
        //    });

           await fetch(this.baseURL+'/api/sdk/user',{
            method:'POST',
            headers:headers,
            body: JSON.stringify(req)
           }).then((response)=>{
            console.log(response)
           }).catch((error)=>{
            console.error(error)
           });
    }


    async pageView(page){
        console.log(' inside page view')

        const request={
            client: this.clientId,
            page:page
        }
        const headers = {
            'Content-Type': 'application/json',
            // 'Authorization': 'auth'
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Credentials': true
          }

        // const response = await axios.post(this.baseURL+'/api/sdk/page',request,{
        //     headers:headers
        //    }).then((response)=>{
        //     console.log(response)
        //    }).catch((error)=>{
        //     console.error(error)
        //    });
        
           await fetch(this.baseURL+'/api/sdk/page',{
            method:'POST',
            headers:headers,
            body: JSON.stringify(request)
           }).then((response)=>{
            console.log(response)
           }).catch((error)=>{
            console.error(error)
           });
           
    }

    async trackConversion(event){
        const request={
            client: this.clientId,
            event:event
        }

        //const response = await axios.post(this.baseURL+'/api/sdk/conversion',request)
    }

}

// module.exports = {
// Lucia
// };
