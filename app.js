require('dotenv').config(); 

// creating an express app 
const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express(); 
const PORT = 5000 || process.env.port 


app.use(express.static('public'))
//view Engine 
app.use(expressLayout); 
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


// sending a request
app.use('/', require('./server/routes/main'))

//listening on a given port 
app.listen(PORT, ()=>{
    console.log(`App is listening on port number ${PORT}`)
})