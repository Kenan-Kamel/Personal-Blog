const express = require('express')
const Post = require('../models/post')
const User = require('../models/user')
const router = express.Router(); 
const adminLayout = '../views/layouts/admin'

/********************************************************* */
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
        console.log(req.body)
        
        res.redirect('admin')

    } catch(error){
        console.log(error)   
    }

});








module.exports = router;