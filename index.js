'use strict'

const express  = require ('express');
const bodyParser = require('body-parser');
const router = require('./src/Routes/Gig')
const db = require('./src/Configs/database');


//test database connection
db.authenticate()
.then ( () => console.log('Database connected ..'))
.catch (err => console.log(`Error: ${err}`))


const app = express();

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))

app.get('/',  (req, res) => res.send('INDEX'))

//GIG routes -- above the port
app.use('/', router);


const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

