const console = require('../config/log').console;

exports.link = (req,res)=>{
    res.status(200).send({
        genLink: 'https://lucia-lg/abcd123'
        
    })
}