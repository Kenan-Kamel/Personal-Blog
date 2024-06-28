require('dotenv').config(); 

// creating an express app 
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB= require('./server/config/db');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')
const session = require('express-session');
const path = require('path')
const app = express(); 
const PORT = 5000 || process.env.port 
const dbURL = process.env.MONGODB_URL ;

// connect to the DB
connectDB();
app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(cookieParser())



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create ({ mongoUrl: dbURL, dbName:'Cluster0'})
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}));
app.use(express.static(path.join(__dirname, 'public')));

//view Engine 
app.use(expressLayout); 
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
//app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));
// sending a request
app.use('/', require('./server/routes/main'))
app.use('/', require('./server/routes/admin'))

//listening on a given port 
app.listen(PORT, ()=>{
    console.log(`App is listening on port number ${PORT}`)
})