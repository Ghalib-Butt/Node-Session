require('dotenv').config();

const express = require('express');
const moongose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const app = express();

const port = process.env.EXPRESS_PORT || 4000;
const mongodbCs = process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'dev';

// Use of middlewares...
app.use(cors());
app.use(express.static('uploads/'));
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method} ------> Request URL: ${req.url} \n`);
    next();
})

app.use('/', routes.postRoutes);

moongose.connect(`${mongodbCs}/${dbName}`).then(() => {
    console.log('Connected to the database');
}).catch((error) => {
    console.error('Error connecting to the database', error);
});

app.listen(port, () => {
    console.log(`Server running at ${port}.`);
})
