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


router.post('/pagamento', async (req, res) => {
    try {
        let macacos = ["pietro-giannini", "tommaso-passerini", "giacomo-serati", "nicola-trotter", 
            "giordani-luca", "lorenzo-fedrizzi", "andrea-pizzinini", "alessandro-chiste",
            "damiano-osello", "eugenio-tani", "umberto-tani", "gabriele-padovani", 
            "fabio-tessari", "giacomo-valla", "axel-barbieri", "luca-giannini", "pietro-mirandola"];
        const users = await Utente.find({ totale: { $ne: 0 } });

        if (users.length === 0) {
            return res.status(404).json({ message: "Nessun utente trovato" });
        }

        const emailPromises = users.map(async (user) => {
            if(user.email!="piegian99@gmail.com"){

                let parti = user.username.split("-");
            let nome = parti[0].charAt(0).toUpperCase() + parti[0].slice(1);
            let cognome = parti.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

            // Creazione elenco ordini in HTML
            let ordiniHTML = `<ul>`;
            if(macacos.includes(user.username)){
                user.tshirt.forEach(tshirt => {
                    ordiniHTML += `<li><strong>T-Shirt</strong> - Taglia: <strong>${tshirt.taglia}</strong> - Colore: <strong>${tshirt.colore}</strong> - 16.30€</li>`;
                });
                user.felpa.forEach(felpa => {
                    ordiniHTML += `<li><strong>Felpa</strong> - Taglia: <strong>${felpa.taglia}</strong> - Colore: <strong>${felpa.colore}</strong> - 24.60€</li>`;
                });

            }else{
                user.tshirt.forEach(tshirt => {
                    ordiniHTML += `<li><strong>T-Shirt</strong> - Taglia: <strong>${tshirt.taglia}</strong> - Colore: <strong>${tshirt.colore}</strong> - 16.50€</li>`;
                });
                user.felpa.forEach(felpa => {
                    ordiniHTML += `<li><strong>Felpa</strong> - Taglia: <strong>${felpa.taglia}</strong> - Colore: <strong>${felpa.colore}</strong> - 25€</li>`;
                });
            }
            
            ordiniHTML += `</ul>`;

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: user.email,
                subject: "PAGAMENTO E CHIUSURA ORDINI MERCH MACACO'S",
                html: `
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <p>Buongiorno <strong>${nome} ${cognome}</strong>,</p>
                        <p>Sono chiusi gli ordini per il merch Macacos.<br>
                        Trovi di seguito il riepilogo del tuo ordine</p>
                        <h3>Dettaglio Ordine:</h3>
                        ${ordiniHTML}
                        <p>E' possibile modificare l'ordine nel nostro sito entro il <strong>21/03</strong> (nel caso di modifiche è consigliato mandare una mail per notificare la modifica)</p>
                        <p><a href="https://storemacacos.netlify.app" style="color: blue; font-weight: bold;">Visita il nostro store per modificare l'ordine</a></p>
                        <p>Accedendo con le seguenti credenziali:</p>
                        <ul>
                            <li><strong>Nome:</strong> ${nome}</li>
                            <li><strong>Cognome:</strong> ${cognome}</li>
                            <li><strong>Email:</strong> ${user.email}</li>
                        </ul>

                         <h3>ISTRUZIONI PAGAMENTO:</h3>
                        <p>Il pagamento della somma totale di <strong>${user.totale.toFixed(2)}€ </strong> deve essere fatto entro il giorno <strong>23/03</strong> altrimenti verrà annullato l'ordine.<br>
                        QUALUNQUE SIA IL METODO DI PAGAMENTO SCRIVETE UNA MAIL DI RISPOSTA O UN MESSAGGIO AL NOSTRO ACCOUNT INSTAGRAM PER NOTIFICARE L'AVVENUTO PAGAMENTO!<br>
                        <strong>
                        <span style="display: block; text-align: center;>"!!! IMPORTANTE !!!<</span><br>
                        AFFINCHE'IL PAGAMENTO CON BONIFICO VENGA ACCETTATO LA CAUSALE DEVE ESSERE LA SEGUENTE:<br>
                        Regalo Macaco's fine anno - nome cognome - mail</strong></p>
                        <h3>METODI DI PAGAMENTO:</h3>
                        <li>Bonifico al seguente indirizzo bancario: IBAN:<strong> IT15O0830401810000010385684</strong> INTESTATARIO: <strong>GIANNINI PIETRO</strong></li>
                        <li>Pagamento su PayPal: <a href="https://PayPal.Me/wuolzordan" style="color: blue; font-weight: bold;">PAGA QUI</a></li>
                        

                        <p>Grazie per aver ordinato il nostro merch,</p>
                        <p><strong>Macaco's Basket team</strong></p>
                    </body>
                    </html>
                `
            };

            return transporter.sendMail(mailOptions);
            }
            
        });

        await Promise.all(emailPromises);

        res.json({ message: "Email inviate con successo!" });

    } catch (error) {
        console.error("Errore nell'invio delle email:", error);
        res.status(500).json({ message: "Errore interno del server" });
    }
});
module.exports=router;