const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const router = express.Router(); 
const adminLayout = '../views/layouts/admin'
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken' )
const alert = require('node-notifier')
const jwtSecret = process.env.JWT_SEC
/********************************************************* */


const authMiddleware = (req,res,next) =>{

    const token = req.cookies.token;

    if(!token){
                alert.notify ({ 
                 title: 'Blog notification ',
                 message: 'Please make sure to be logged in!' });
                res.redirect('/admin')
               // return res.status(401).json({message: 'Unauthorized'})
                
    }

    try{
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;
        next();
        
    }catch(error){
        res.status(401).json({message: 'Unauthorized'})

    }

};

router.get('/admin', async (req,res) => {
        
    try{
        const locals ={
        title:'Admin'

    }
        res.render('admin/index', {locals, layout:adminLayout})

    } catch(error){
        console.log(error)   
    }

});

router.post('/admin', async (req,res) => {

    
    try{

        const {username,password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(401).json({message:'Invalid credentials'})
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid credentials'})
        }

        const token = jwt.sign({userId: user._id}, jwtSecret)
        res.cookie('token', token, {httpOnly: true})
        res.redirect('/dashboard')

    } catch(error){
        console.log(error)   
    }

});


router.post('/register', async (req,res) => {

    
    try{
        const {username,password} = req.body;
        const hashedPasswords = await bcrypt.hash(password,10);
       try{

        const user = await User.create({username,password:hashedPasswords});
        res.status(201).json({message:"User created",user});

       }catch(error){

         if(error.code == 11000){
            res.status(409).json({message:'User already registered'})
         }

         res.status(500).json({message:'internal server error'})

       }

    } catch(error){
        console.log(error)   
    }

});

router.get('/dashboard',authMiddleware, async (req,res) =>{

    res.render('admin/dashboard')

});







module.exports = router;