const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente'); // get our mongoose model

router.post('/login', async (req, res) => {
    let name=req.body.name.toLowerCase().trim();
    const surname=req.body.surname.toLowerCase().trim();
    const email=(req.body.email).toLowerCase().trim();
    const username =name+"-"+surname;
    if(!surname){
        return res.status(400).json({error:"missing surname"});
    }
    if(!email || !email.includes('@')){
        return res.status(400).json({error:"wrong email format"});
    }
 
    if(!name){
        return res.status(400).json({error:"missing name"})
    }
    let utente=await Utente.findOne({username:username});
    if(!utente){
        await Utente.create({username:username,tshirt:undefined,felpa:undefined,totale:0,email:email});
        return res.status(200).json({username:username});
    }
    else{
        if(utente.email!=email){
            utente.email=email;
            await utente.save();
        }
        return res.status(200).json({username:username});
    }
});


router.get('/:username/ordini/tshirt', async (req, res) => {
    let username=req.params.username;
    
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        
        return res.status(200).json(utente.tshirt);
    }
});
router.get('/:username/ordini/felpa', async (req, res) => {
    let username=req.params.username;
    
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        
        return res.status(200).json(utente.felpa);
    }
});
router.get('/:username/totale', async (req, res) => {
    let username=req.params.username;
    
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        
        return res.status(200).json(utente.totale);
    }
});

module.exports=router;