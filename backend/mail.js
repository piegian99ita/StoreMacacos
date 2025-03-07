const nodemailer = require("nodemailer");
const express = require('express');
const router = express.Router();
const Utente = require('./models/Utente'); // get our mongoose model
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

router.post('/prezzo', async (req, res) => {
    
    const users = await Utente.find({ totale: { $ne: 0 } });
    if (users.length === 0) {
        return res.status(404).json({ message: "Nessun utente trovato" });
    }

    for (const user of users) {
        if(user.username!="francesco-gionghi"){
            let parti=user.username.split("-");
            
            let nome=parti[0].charAt(0).toUpperCase() + parti[0].slice(1);

            let cognome=(parti[1]).charAt(0).toUpperCase() +parti[1].slice(1);

            if(parti.length>2){
                for (let i=2;i<parti.length;i++){
                    cognome=cognome + " " + (parti[i]).charAt(0).toUpperCase() + parti[i].slice(1);
                }
            }
            console.log(nome)
            console.log(cognome)
            
            

            
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: "CAMBIO PREZZO MERCH MACACO'S",
                text:  `Buongiorno,\ndopo che abbiamo contattato l'azienda che ci stampa il vestiario ci hanno comunicato che hanno cambiato i prezzi per i vari capi.\nNel caso puoi trovare il totale dell'ordine andando alla pagina: https://storemacacos.netlify.app; accedendo con le seguenti credenziali:\n\tnome: ${nome}\n\tcognome: ${cognome}\n\temail: ${user.email}\n\nDopo aver fatto l'accesso, cliccando sul quadrato "VISUALIZZA RIEPILOGO ORDINI", potrai visualizzare il costo totale dell'ordine in fondo alla pagina ed eventualmente togliere dall'ordine i vari capi d'abbigliamento che non vuoi più ordinare.\nSono state aggiunte anche le felpe viola allo store nel caso volessi cambiare colore.\nMacaco's Basket team.`, 
            };

            await transporter.sendMail(mailOptions);

        }
        
    }

    res.json({ message: "Email inviate con successo!" });


});

module.exports=router;