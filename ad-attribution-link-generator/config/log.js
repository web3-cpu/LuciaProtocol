const fs = require('fs')
const util = require('util')
const fileLog = fs.createWriteStream('resources'+'/server.log',{flags:'w'});
const errorLog = fs.createWriteStream('resources'+'/error.log',{flags:'w'});
const output = process.stdout;

console.log =(s)=>{
    fileLog.write(util.format(s) + '\n');
    output.write(util.format(s)+'\n');
};

console.error=(e) =>{
    errorLog.write(util.format(e) +'\n');
}

module.exports = {console}