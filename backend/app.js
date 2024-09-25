const express = require('express');
const app = express();
const cors = require('cors');
const utente=require('./utente');
const ordine=require('./ordine');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/api/utente',utente);
app.use('/api/ordine',ordine);

module.exports=app;