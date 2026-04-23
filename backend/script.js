import mongoose from 'mongoose';
import Utente from './models/Utente.js';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB connesso!');
  } catch (error) {
    console.error('Errore di connessione a MongoDB:', error);
  }
}



async function exampleCall() {
  await connectDB(); // Connect to the database first
  await aggiornaDocumenti();
}

exampleCall();

async function aggiornaDocumenti() {
  try {
    // Cerchiamo tutti gli utenti che hanno il totale diverso da 0 
    // o che hanno l'attributo edited a true
    const query = { 
      $or: [
        { totale: { $ne: 0 } },
        { edited: true }
      ]
    };

    // Eseguiamo l'aggiornamento massivo
    const result = await Utente.find(query);
    const updatePromises = result.map(user => {
  // Qui puoi usare i dati reali dell'utente
    
    const n_m = user.tshirt ? user.tshirt.length : 0;
    const n_f = user.felpa ? user.felpa.length : 0;

    // 2. Calcolo del totale (prezzi unitari)
    const nuovoTotale = (n_m * 16.60) + (n_f * 25.20);
    
    // Arrotondamento a 2 decimali per evitare errori floating point
    user.totale = Math.round(nuovoTotale * 100) / 100;
    return user.save(); // Salva il singolo documento
  });
  await Promise.all(updatePromises);

  } catch (error) {
    console.error("Errore durante l'aggiornamento dei documenti:", error);
  } finally {
    // È buona norma chiudere la connessione alla fine di uno script stand-alone
    await mongoose.connection.close();
    console.log("Connessione chiusa.");
  }
}