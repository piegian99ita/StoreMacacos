const express = require('express');
const app = express();
const cors = require('cors');
const utente=require('./utente');
const ordine=require('./ordine');
const felpa=require('./felpa')
const maglietta=require('./maglietta')
const mail=require('./mail')
const edit=require('./edit')
const divisa=require('./divisa')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/api/utente',utente);
app.use('/api/ordine',ordine);
app.use('/felpe',felpa);
app.use('/magliette',maglietta);
app.use('/api/mail',mail);
app.use('/api/edit',edit);
app.use('/api/divise',divisa);

module.exports=app;