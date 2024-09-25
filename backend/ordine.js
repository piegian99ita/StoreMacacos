const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente'); // get our mongoose model
const Felpa = require('./models/Felpa');
const Tshirt = require('./models/Tshirt');

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
        return res.status(200).json(utente);
    }
});

router.post('/:username/tshirt', async (req, res) => {
    let username=[];
    username.push(req.params.username);
    const taglia=req.body.taglia;
    const colore=req.body.colore;

    if(!taglia){
        return res.status(400).json({error:"missing taglia"});
    }
    if(!colore){
        return res.status(400).json({error:"missing colore"});
    }
    if(!req.params.username){
        return res.status(400).json({error:"missing surname"});
    }


    let tshirt=await Tshirt.findOne({colore:colore,taglia:taglia});
    if(!tshirt){
        await Tshirt.create({colore:colore,taglia:taglia,numeroOrdini:1,nomi:username});
    }
    else{
        tshirt.numeroOrdini++;
        tshirt.nomi.push(req.params.username);
        await tshirt.save();
    }
    let utente =await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    } 
    else{
        utente.totale+=13;
        utente.tshirt.push({colore:colore,taglia:taglia});
        await utente.save();
        return res.status(200).json({message:"aggiunto correttamente"});
    }

});

router.post('/:username/felpa', async (req, res) => {
    let username=[];
    username.push(req.params.username);
    const taglia=req.body.taglia;
    const colore=req.body.colore;

    if(!taglia){
        return res.status(400).json({error:"missing taglia"});
    }
    if(!colore){
        return res.status(400).json({error:"missing colore"});
    }
    if(!req.params.username){
        return res.status(400).json({error:"missing surname"});
    }


    let felpa=await Felpa.findOne({colore:colore,taglia:taglia});
    if(!felpa){
        await Felpa.create({colore:colore,taglia:taglia,numeroOrdini:1,nomi:username});
    }
    else{
        felpa.numeroOrdini++;
        felpa.nomi.push(req.params.username);
        await felpa.save();
    }
    let utente =await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    } 
    else{
        utente.totale+=23;
        utente.felpa.push({colore:colore,taglia:taglia});
        await utente.save();
        return res.status(200).json({message:"aggiunto correttamente"});
    }

});

router.delete('/:username/tshirt', async (req, res) => {
    let username=[];
    username.push(req.params.username);
    const taglia=req.body.taglia;
    const colore=req.body.colore;

    if(!taglia){
        return res.status(400).json({error:"missing taglia"});
    }
    if(!colore){
        return res.status(400).json({error:"missing colore"});
    }
    if(!req.params.username){
        return res.status(400).json({error:"missing surname"});
    }


    let tshirt=await Tshirt.findOne({colore:colore,taglia:taglia});
    if(!tshirt || tshirt.numeroOrdini<1){
        return res.status(404).json({message:"tshirt non esistente"});
    }
    else{
        tshirt.numeroOrdini--;
        let index=tshirt.nomi.indexOf(req.params.username);
        if (index !== -1) {
            tshirt.nomi.splice(index, 1); 
        }
        await tshirt.save();
    }
    let utente =await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    } 
    else{
        utente.totale-=13;
        let index = utente.tshirt.findIndex(item => item.colore === colore && item.taglia === taglia);
        if (index !== -1) {
            utente.tshirt.splice(index, 1); 
        }
        await utente.save();
        return res.status(200).json({message:"rimozione oggetto avvenuta correttamente"});
    }

});

router.delete('/:username/felpa', async (req, res) => {
    let username=[];
    username.push(req.params.username);
    const taglia=req.body.taglia;
    const colore=req.body.colore;

    if(!taglia){
        return res.status(400).json({error:"missing taglia"});
    }
    if(!colore){
        return res.status(400).json({error:"missing colore"});
    }
    if(!req.params.username){
        return res.status(400).json({error:"missing surname"});
    }


    let felpa=await Felpa.findOne({colore:colore,taglia:taglia});
    if(!felpa || felpa.numeroOrdini<1){
        return res.status(404).json({message:"felpa non esistente"});
    }
    else{
        felpa.numeroOrdini--;
        let index=felpa.nomi.indexOf(req.params.username);
        if (index !== -1) {
            felpa.nomi.splice(index, 1); 
        }
        await felpa.save();
    }
    let utente =await Utente.findOne({username:username});
    if(!utente){
        return res.status(404).json({message:"user non trovato"});
    } 
    else{
        utente.totale-=23;
        let index = utente.felpa.findIndex(item => item.colore === colore && item.taglia === taglia);
        if (index !== -1) {
            utente.felpa.splice(index, 1); 
        }
        await utente.save();
        return res.status(200).json({message:"rimozione oggetto avvenuta correttamente"});
    }

});



module.exports=router;

