import { Client } from '../models/Client.js';
import { User } from '../models/User.js';
import { Fingerprint } from '../models/Fingerprint.js';
import { Page_view } from '../models/Pageview.js';
import { Conversion_data } from '../models/ConversionData.js';
import bcrypt from 'bcrypt'
import { ApiKey } from "../models/ApiKey.js";
import { Button_click } from '../models/ButtonClick.js';
import { Sequelize } from 'sequelize';


export const distinctFingerprints= async(req,res)=>{
    try {
        if(!req.body || !req.body.client || req.body.client==null){  
            res.status(400).json({message: 'Mandatory field is missing'});
       
        }else{
           
            const clientName = req.body.client;
            const key= req.get('X-API-KEY');
            console.log('key:',key);
            const client = await Client.findOne({
                where:{
                    username: clientName
                }
            });
            if(client===null){
                res.status(400).json({message: 'client username not found'});
                return;
            }
            const flag = await autheticateUser(key,client.id)
            if(!flag){
                console.log('authentication failed')
                res.status(401).send({
                    auth: false
                });
                return;
            }
            const fingerprints = await Fingerprint.findAll({})

            res.status(200).json(fingerprints);     
        }
    } catch (error) {
        console.log(error.message)
        console.log('error in user storage')
    }
};

export const getPageViews= async(req,res)=>{
    try {
        if(!req.body || !req.body.client || req.body.client==null){  
            res.status(400).json({message: 'Mandatory field is missing'});
       
        }else{
           
            const clientName = req.body.client;
            const key= req.get('X-API-KEY');
            console.log('key:',key);
            const client = await Client.findOne({
                where:{
                    username: clientName
                }
            });
            if(client===null){
                res.status(400).json({message: 'client username not found'});
                return;
            }
            const flag = await autheticateUser(key,client.id)
            if(!flag){
                console.log('authentication failed')
                res.status(401).send({
                    auth: false
                });
                return;
            }
            //distinct 
            // const pageViews = await Page_view.findAll({
            //     attributes:[[Sequelize.fn('DISTINCT',Sequelize.col('page')), 'page'],
            // 'fingerprint_id','created_at']
            // })
            const pageViews = await Page_view.findAll({
                where:{
                    client_id:client.id
                }
            })

            console.log('data stored' )
            res.status(200).json(pageViews);     
        }
    } catch (error) {
        console.log(error.message)
        console.log('error in user storage')
    }
};

export const getConversions= async(req,res)=>{
    try {
        if(!req.body || !req.body.client || req.body.client==null){  
            res.status(400).json({message: 'Mandatory field is missing'});
       
        }else{
           
            const clientName = req.body.client;
            const key= req.get('X-API-KEY');
            console.log('key:',key);
            const client = await Client.findOne({
                where:{
                    username: clientName
                }
            });
            if(client===null){
                res.status(400).json({message: 'client username not found'});
                return;
            }
            const flag = await autheticateUser(key,client.id)
            if(!flag){
                console.log('authentication failed')
                res.status(401).send({
                    auth: false
                });
                return;
            }
            //distinct 
            // const pageViews = await Page_view.findAll({
            //     attributes:[[Sequelize.fn('DISTINCT',Sequelize.col('page')), 'page'],
            // 'fingerprint_id','created_at']
            // })
            const conversion = await Conversion_data.findAll({
                where:{
                    client_id:client.id
                }
            })
            res.status(200).json(conversion);     
        }
    } catch (error) {
        console.log(error.message)
        console.log('error in user storage')
    }
};
export const getClicks = async(req,res)=>{
    try {
        if(!req.body || !req.body.client || req.body.client==null){  
            res.status(400).json({message: 'Mandatory field is missing'});
       
        }else{
           
            const clientName = req.body.client;
            const key= req.get('X-API-KEY');
            console.log('key:',key);
            const client = await Client.findOne({
                where:{
                    username: clientName
                }
            });
            if(client===null){
                res.status(400).json({message: 'client username not found'});
                return;
            }
            const flag = await autheticateUser(key,client.id)
            if(!flag){
                console.log('authentication failed')
                res.status(401).send({
                    auth: false
                });
                return;
            }
            //distinct 
            // const pageViews = await Page_view.findAll({
            //     attributes:[[Sequelize.fn('DISTINCT',Sequelize.col('page')), 'page'],
            // 'fingerprint_id','created_at']
            // })
            const clicks = await Button_click.findAll({
                where:{
                    client_id:client.id
                }
            })
            res.status(200).json(clicks);     
        }
    } catch (error) {
        console.log(error.message)
        console.log('error in user storage')
    }
};

async function autheticateUser(key,clientId){
    const apiKey = await ApiKey.findOne({
        where: {
            client_id:clientId,
            active:true
        },
      });
      var retVal=false;
      try{
      if(apiKey!==null){
        await bcrypt
            .compare(key,apiKey.key)
            .then(resp => {
                if(resp==true){
                    retVal=true;      
                }
            })
            .catch(err => console.error(err.message)) 
        }
    }catch(e){
        console.log(e.message);
    }
        return retVal;
};