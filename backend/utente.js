const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente'); // get our mongoose model
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

router.post('/login', async (req, res) => {
    let name=req.body.name.toLowerCase().trim();
    const surname=req.body.surname.toLowerCase().trim();
    const email=(req.body.email).toLowerCase().trim();
    let username =name+"-"+surname;
    // Normalizza la stringa e rimuove gli accenti
    username = username.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Sostituisce gli spazi con trattini
    username = username.replace(/\s+/g, "-");
    username = username.replace("'", "-");
    username = username.replace("--", "-");
    
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
        await Utente.create({username:username,tshirt:undefined,felpa:undefined,totale:0,email:email,edited:true});
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
        
        return res.status(200).json(utente.totale.toFixed(2));
    }
});


router.post('/:username/totale', async (req, res) => {
    let username=req.params.username;
    const pass=req.body.pass;
    let totale=0;
    let maglietta=17;
    let felpa=25;
    

    if(pass!=process.env.PASS){
        return res.status(400).json({error:"wrong or missing password"});
    }
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        
        totale+=(utente.tshirt.length)*maglietta+(utente.felpa.length)*felpa;
        totale = parseFloat(totale.toFixed(2));

        utente.totale=totale;
        utente.edited=true;
        await utente.save();
        return res.status(200).json(utente.totale.toFixed(2));
    }
});

module.exports=router;