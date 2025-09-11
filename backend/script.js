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

async function aggiornaDocumenti() {
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