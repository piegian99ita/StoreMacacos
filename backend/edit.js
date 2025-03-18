const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente'); // get our mongoose model


router.get('/', async (req, res) => {
    
 
    
    let utenti=await Utente.find({edited:true});
    if (utenti.length === 0 || !utenti) {
        return res.status(200).json({ message: "Nessun ordine modificato" });
    } else {
        const usernames = utenti.map(utente => utente.username);
        return res.status(200).json(usernames);
    }
});


router.put('/clear', async (req, res) => {    
    let utenti=await Utente.find({edited:true});
    if (utenti.length === 0 || !utenti) {
        return res.status(200).json({ message: "Nessun ordine modificato" });
    } else {
        for (const utente of utenti) {
            utente.edited=false;
            await utente.save();
        };
        const usernames = utenti.map(utente => utente.username);
        return res.status(200).json(usernames);
    }
});

module.exports=router;