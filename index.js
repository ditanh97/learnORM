'use strict'
require ('dotenv/config');

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
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false})) //to make form data request valid

// app.get('/',  (req, res) => res.send(req.rawHeaders))
// app.get('/',  (req, res) => res.send(req.header("user-agent")))

//STATIC FOLDER HANDLING 
app.use(express.static('public'));

//check 2
app.post('/contact', (req, res) => {
    res.send(req.body.name); 
    // res.send(req.header('Content-Type')); 
    if (!req.body.name) {
        return res.status(400).send('Name is required');
    }

    //DATABASE STUFF
//    return res.status(201).send(`Thank you ${req.body.name}`)

    //req.body hanya akan bekerja jika app.use(express.json()) dideclare
})

//AUTHORIZATION SIMULATION
app.post('/login', (req, res) => {
    if (!req.header('x-auth-token')) {
        return res.status(400).send('No token');
    }
    if (req.header('x-auth-token') !== '123456') {
        return res.status(401).send('Not authorized')
    }
    res.send('Logged in');
})

//PUT REQUEST SIMULATION
app.put('/post/:id', (req,res) => {
    //database stuff to update the post

    res.json({
        id: req.params.id,
        title: req.body.title
    })
} )

//DELETE REQUEST SIMULATION
app.delete('/delete/:id', (req,res) => {
    //database stuff to update the post

    res.json({
        msg: `Post ${req.params.id} deleted` 
    });
} )





//GIG routes -- above the port
app.use('/', router);


const PORT = process.env.DB_PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

