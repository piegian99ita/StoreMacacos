const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente');
const Divisa = require('./models/Divisa');

router.post('/:username', async (req, res) => {
    let username=req.params.username;
    const taglia=req.body.taglia;
    const numero=req.body.numero;

    if(!taglia){
        return res.status(400).json({error:"missing taglia"});
    }
    if(!numero){
        return res.status(400).json({error:"missing numero"});
    }
    if(!req.params.username){
        return res.status(400).json({error:"missing username"});
    }


    let divisa=await Divisa.findOne({numero:numero});
    if(!divisa){
        await Divisa.create({taglia:taglia,numero:numero,nome:username});
    }
    else{
        
        if(username==divisa.nome){
            divisa.taglia=taglia;
            await divisa.save();
        }
        else{
            return res.status(400).json({error:"numero già prenotato"});
        }
        
    }
    let utente =await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    } 
    else{
        
        utente.divisa.taglia=taglia;
        utente.divisa.numero=numero;
        utente.edited=true;
        await utente.save();
        return res.status(200).json({message:"aggiunto correttamente"});
    }
});

router.get('/riepilogo', async (req, res) => { 
    let divisa=await Divisa.find();
    if(!divisa){
        return res.status(404).json({message:"Nessuna divisa trovata"});
    }
    else{
        return res.status(200).json(divisa);
    }
});

router.get('/:username', async (req, res) => {
    let username=req.params.username;
    
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        if(!utente.divisa){
            return res.status(404).json({message:"nessuna divisa prenotata"});
        }
        return res.status(200).json(utente.divisa);
    }
});

router.get('/:username/numero', async (req, res) => {
    let username=req.params.username;
    
    if(!username){
        return res.status(400).json({error:"missing surname"});
    }
 
    
    let utente=await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    }
    else{
        if(!utente.divisa){
            return res.status(404).json({message:"nessuna divisa prenotata"});
        }
        return res.status(200).json(utente.divisa.numero);
    }
});


router.get('/unavailable', async (req, res) => {
    
    
    let divise =await Divisa.find();
    
        let unavailable=[]
        if(!divise){
            return res.status(200).json(unavailable);
        }
        else{divise.forEach((element)=>{
            unavailable.push(element.numero);
        })
        return res.status(200).json(unavailable);}
        
    
});
module.exports=router;
