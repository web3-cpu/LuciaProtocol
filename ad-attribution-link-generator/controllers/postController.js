const console = require('../config/log').console;

exports.create = (req,res)=>{

    
    if(!req.body)
    return res.send("NO params PASSED")

    if(!req.body.name)
    return res.send("NO name PASSED")

    if(!req.body.target)
    return res.send("NO target PASSED")

    if(req.body.name==null || req.body.target==null){  

    console.error(' Input error: Missing mandatory fields' );
    res.status(400).json({message: 'Mandatory field is missing'})

    }else{
        res.status(200).send({
        done: true
        })
    }


}