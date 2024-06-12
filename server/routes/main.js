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

router.get('/post/:id', async (req,res)=>{
    
    try{
      
    let slug = req.params.id; 

        const data = await Post.findById({_id: slug});
          const locals = {
            title: data.title
    };

        res.render('post', {locals,data});

        

    } catch(error){
        console.log(error)
    }

})


// POST Req

    router.post('/search',async(req,res)=>{
        try{
            const locals= {
            title:'Search'
        }
           let SearchTerm = req.body.searchTerm; 
           const searchNoSpecChar = SearchTerm.replace(/[^a-zA-Z0-9 ]/g,"")
           const data = await Post.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecChar, 'i')}}


            ]
           });

    

           
            res.render("search", {
                data,
                locals
            });

        }catch(error){
            console.log(error)
        }

    });



// the database has been tested and it works by adding data
module.exports =router;


