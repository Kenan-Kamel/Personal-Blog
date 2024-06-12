require('dotenv').config(); 

// creating an express app 
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB= require('./server/config/db');
const app = express(); 
const PORT = 5000 || process.env.port 

// connect to the DB
connectDB();
app.use(express.urlencoded({extend: true}))
app.use(express.json());

app.use(express.static('public'))
//view Engine 
app.use(expressLayout); 
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// sending a request
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

//listening on a given port 
app.listen(PORT, ()=>{
    console.log(`App is listening on port number ${PORT}`)
})