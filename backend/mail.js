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
        if(user.username=="pietro-giannini"){
            let parti=user.username.split("-");
            let nome=(parti[0]).charAt(0).toUpperCase();
            let cognome=(parti[1]).charAt(0).toUpperCase();
            if(parti.length>2){
                for (let i=2;i<parti.length;i++){
                    cognome=cognome + " " + (parti[i]).charAt(0).toUpperCase();
                }
            }
            
            

            
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: "Cambio prezzo",
                text:  `Buongiorno,\ndopo che abbiamo contattato l'azienda che ci stampa il vestiario ci hanno comunicato che hanno cambiato i prezzi
                        per i vari capi. Nel caso puoi trovare il totale dell'ordine andando alla pagina: https://storemacacos.netflify.app; 
                        accedendo con le seguenti credenziali:\n\tnome:${nome}\n\tcognome:${cognome}\n\temail:${user.email}
                        \nDopo aver fatto l'accesso, cliccando sulla barra in alto su ordini, potrai visualizzare il costo totale dell'ordine in fondo alla pagina 
                        ed eventualmente togliere dall'ordine i vari capi d'abbigliamento.
                        \nSono state aggiunte anche le felpe viola che possono essere ordinate cliccando sula barra in alto su felpe
                        \n\nBuona giornata,\nBasket Macaco's team.`, 
            };

            await transporter.sendMail(mailOptions);

        }
        
    }

    res.json({ message: "Email inviate con successo!" });


});

module.exports=router;