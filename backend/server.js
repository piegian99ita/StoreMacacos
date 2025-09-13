const { default: mongoose } = require('mongoose');
const app = require('./app');
const express = require('express');
const job = require('./cron.js');
const path = require('path');
const port = 3050;
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

app.use(express.static(path.join(__dirname, '../frontend', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            // Avvia il job cron solo dopo che il server è in ascolto
            job.job.start();
        });
    })
    .catch(error => {
        console.error('Failed to connect to the database:', error);
    });