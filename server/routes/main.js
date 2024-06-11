const express = require('express')
const Post = require('../models/post')
const router = express.Router(); 
//** This is the home -->GET */
router.get('',async(req,res)=>{

    


    try{
        const locals= {

        title:"Kenan Alghythee Blog",
        description:"Kenan Alghythee Personal/Professional "
    }
     let perPage =10;
     let page = req.query.page || 1; 
     const data = await Post.aggregate([{$sort:{createdAt: -1}}])
     .skip(perPage * page - perPage)
     .limit(perPage)
     .exec();

     const Count = await Post.countDocuments();
     console.log(Count)
     const nextPage = parseInt(page) + 1 
     const hasNextPage = nextPage <= Math.ceil(Count/perPage);
    

        //const data = await Post.find();
        res.render('index', {locals
            ,data
            ,current: page,
             nextPage:hasNextPage ?nextPage : null})


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
/** 
function insertPostData(){
    Post.insertMany([
        {
            title: "Building a Blog",
            body: "Test again 2 "
        },
    ])
}
insertPostData()
*/

// the database has been tested and it works by adding data
module.exports =router;


