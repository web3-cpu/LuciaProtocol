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

// not yet working

const { ApplePaySession, matchMedia } = window
var applePay;
if (typeof ApplePaySession?.canMakePayments !== 'function') {
    applePay = false
}

try {
   ApplePaySession.canMakePayments() ? applePay = true : applePay = false
} catch (error) {
   console.log(error.message)
}
 var colorDepth;
try{
    colorDepth= window.screen.colorDepth;
}catch(e){
    console.log(e.message)
}

function doesMatch(value) {
    return matchMedia(`(prefers-contrast: ${value})`).matches
}
 var contrast;
try{
    if (doesMatch('no-preference')) {
        contrast = 'None';
      }
      if (doesMatch('high') || doesMatch('more')) {
        contrast = 'More';
      }
      if (doesMatch('low') || doesMatch('less')) {
        contrast = 'Less';
      }
      if (doesMatch('forced')) {
        contrast = 'ForcedColors';
      }
}catch(e){
    console.log(e.message)
}

var gamut;
for (const g of ['rec2020', 'p3', 'srgb']) {
    if (matchMedia(`(color-gamut: ${g})`).matches) {
        gamut = g
    }
  }

  var indexedDB;
  try{
    indexedDB = window.indexedDB;
  }catch(e){
    console.log(e.message)
  }

  var localStorage;
  var openDB;

  try{
localStorage = window.localStorage;
openDB = window.openDatabase
  }catch(e){
    console.log(e.message)
  }
var sourceId;

//private click measurement

try{
    const link = document.createElement('a')
    sourceId = link.attributionSourceId ?? link.attributionsourceid
}catch(e){
    console.log(e.message)
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

var cpuClass;
try{
    cpuClass=navigator.cpuClass;
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

var src;
var hVal;
// canvas
try{
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
 src =  canvas.toDataURL();
 await hash('yourStringHere').then((result) => {
    hVal= result;
}).catch((error) => {
    console.error(error);
});
}catch(e){
    console.log(e.message)
}

// canvas
function udata() {
    return {
        data: {   
        location: loc,
        memory: mem,
        agent: agnt,
        cores: cores,
        language: lang,
        devicePixelRatio: scale,
        encoding: encoding,
        timeZone: timeZone,
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
        //applePay: applePay,
        colorDepth:colorDepth,
        contrast:contrast,
        colorGamut: gamut,
        cpuClass:cpuClass,
        indexedDB:indexedDB,
        openDB:openDB,
        localStorage:localStorage,
        sourceId:sourceId
            
        }
    }
}

function hash(string) {
    return new Promise((resolve, reject) => {
        try {
            const utf8 = new TextEncoder().encode(string);

            crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray
                    .map((bytes) => bytes.toString(16).padStart(2, '0'))
                    .join('');
                resolve(hashHex);
            });
        } catch (e) {
            console.error(e.message);
            reject(e);
        }
    });

}

export default class Lucia{

    constructor(options){
        this.clientId = options.clientId;
        this.baseURL = options.baseURL;
        this.api_key = options.api_key;
        this.data=udata();
        this.user=options.username;
    }

    async authenticate(){
        console.log('inside authenticate');
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.api_key
          }
        const req = {
            user: this.clientId,
            key: this.api_key
        };

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
            'X-API-KEY': this.api_key
          }
        const req={
            client: this.clientId,
            user: {name: user,
            data: this.data}
        }

        this.user = user
        


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
            page:page,
            user: {name: this.user,
                data: this.data}
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.api_key
          }
           await fetch(this.baseURL+'/api/sdk/page/',{
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
            event:event,
            user: {name: this.user,
                data: this.data}
        }

        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.api_key
          }
        
           await fetch(this.baseURL+'/api/sdk/conversion/',{
            method:'POST',
            headers:headers,
            body: JSON.stringify(request)
           }).then((response)=>{
            console.log(response)
           }).catch((error)=>{
            console.error(error)
           });
    }

    async buttonClick(button){
        const request={
            client: this.clientId,
            button:button,
            user: {name: this.user,
                data: this.data}
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-API-KEY': this.api_key
          }
           await fetch(this.baseURL+'/api/sdk/click/',{
            method:'POST',
            headers:headers,
            body: JSON.stringify(request)
           }).then((response)=>{
            console.log(response)
           }).catch((error)=>{
            console.error(error)
           });
    }

}

