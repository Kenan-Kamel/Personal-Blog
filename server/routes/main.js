const express = require('express')
const Post = require('../models/post')
const router = express.Router(); 
//** This is the home -->GET */
router.get('',async(req,res)=>{

    const locals= {

        title:"Kenan Alghythee Blog",
        description:"Kenan Alghythee Personal/Professional "
    }
    


    try{

        const data = await Post.find();
        res.render('index', {locals,data})


    }catch (error)
    {
        console.log('There was an error in reading from the DB at main.js')
        console.log(error)
    }

}); 




router.get('/about',(req,res)=>{
    res.render('about')
}); 





// Testing the DataBase
function insertPostData(){
    Post.insertMany([
        {
            title: "Building a Blog",
            body: "Test again 2 "
        },
    ])
}
insertPostData()
// the database has been tested and it works by adding data
module.exports =router;


