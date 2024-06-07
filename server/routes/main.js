const express = require('express')



const router = express.Router(); 

router.get('',(req,res)=>{

    const locals= {

        title:"Kenan Alghythee Blog",
        description:"Kenan Alghythee Personal/Professional "
    }
    res.render('index', locals)
}); 


router.get('/about',(req,res)=>{
    res.render('about')
}); 



module.exports =router;


