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

async function aggiornaDocumenti2() {
  try {
    const users = await Utente.find({ totale: { $ne: 0 } });

    if (users.length === 0) {
      console.log("Nessun utente trovato");
      return;
    }

    const emailPromises = users.map(async (user) => {
      if (user.edited) {
        console.log(user.username);
      }
    });

    await Promise.all(emailPromises);
    console.log("Aggiornamento completato.");

  } catch (error) {
    console.error("Errore durante l'aggiornamento dei documenti:", error);
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

    const update = {
      $set: { 
        totale: 0, 
        edited: false,
        tshirt: [], // Svuota l'array
        felpa: []   // Svuota l'array
      }
    };

    // Eseguiamo l'aggiornamento massivo
    const result = await Utente.updateMany(query, update);

    console.log(`Operazione completata!`);
    console.log(`Documenti trovati: ${result.matchedCount}`);
    console.log(`Documenti modificati effettivamente: ${result.modifiedCount}`);

  } catch (error) {
    console.error("Errore durante l'aggiornamento dei documenti:", error);
  } finally {
    // È buona norma chiudere la connessione alla fine di uno script stand-alone
    await mongoose.connection.close();
    console.log("Connessione chiusa.");
  }
}