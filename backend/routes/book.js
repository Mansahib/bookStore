const router=require("express").Router();
const  User  = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken=require('./userAuth');
const Book = require("../models/books");
//add book-admin
router.post('/add-book',authenticateToken,async(req,res)=>{
try{
    const {id}=req.headers;
    const user=await User.findById(id);
    if(user.role!=="admin"){
        return res.status(401).json({message:"You are not authorized to add book"});
    }
    else{
    const book=new Book({
        url: req.body.url,
        title:req.body.title,
        author:req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
    });
    await book.save();
    res.status(200).json({message:"Book Added Successfully"});
    }
}catch(err)
{
    res.status(500).json({message:"internal server error"});
}
})

//update book -admin
router.put('/update-book',authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndUpdate(bookid,{
                    url: req.body.url,
                    title:req.body.title,
                    author:req.body.author,
                    price: req.body.price,
                    desc: req.body.desc,
                    language: req.body.language,
                });
                res.status(201).json({message:"Book Updated Successfully"});

    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

// delete book -admin
router.delete('/delete-book',authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book Deleted Successfully"});
    }
    catch(err){
        res.status(500).json({message:"internal server error"});

    }
})

//get all books -everyone
router.get('/get-all-books',async(req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1});
        res.json({status:"success",data:books});
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})
//recently added books limit 4 --everyone
router.get('/recently-added-books',async(req,res)=>{
try{
    const books=await Book.find().sort({createdAt:-1}).limit(4);
    res.json({status:"success",data:books});

}
catch(err){
    res.status(500).json({message:"internal server error"});
}
})

// get book by id --everyone
router.get('/get-book-by-id/:id',async(req,res)=>{
    try{
        const { id }=req.params;
        const book=await Book.findById(id);
        res.json({status:"success",data:book});
    }
    
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})
module.exports=router;