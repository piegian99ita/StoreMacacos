const Utente = require('./models/Utente'); // Percorso al tuo modello Mongoose

async function aggiornaDocumenti() {
  try {
    const risultato = await Utente.updateMany({}, { $set: { edited: false } });
    console.log(`Aggiornati ${risultato.modifiedCount} documenti.`);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dei documenti:", error);
  }
}
aggiornaDocumenti();