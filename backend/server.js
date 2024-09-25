const { default: mongoose } = require('mongoose');
const app = require('./app');
const path = require('path');
const port =  3050;
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

mongoose.connect(process.env.DB_URL).then(
        app.listen(port, () => {
    })
);