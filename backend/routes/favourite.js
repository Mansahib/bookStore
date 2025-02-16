const router=require("express").Router();
const  User  = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken=require('./userAuth');

//add book to fav loged in user
router.post('/add-book-to-fav',authenticateToken,async(req,res)=>{
try{
    const {id,bookid}=req.headers;
    const userData = await User.findById(id);
    const isBookFavourite=userData.favourities.includes(bookid);
    if(isBookFavourite){
        return res.status(200).json({message:"Book is Favourite already"});
    }
    await User.findByIdAndUpdate(id,{ $push: { favourities: bookid } });
    return res.status(200).json({message:"Book addedto favourites"});

}
catch(err){
    res.status(400).json({message:err.message});
}
})
// delete from fav loged in user
router.put( '/delete-book-from-fav',authenticateToken,async(req,res)=>{
    try{
        const {id,bookid}=req.headers;
        const userData = await User.findById(id);
        const isBookFavourite=userData.favourities.includes(bookid);
        if(isBookFavourite ){
            await User.findByIdAndUpdate(id,{ $pull: { favourities: bookid } });
        }

        return res.status(200).json({message:"Book deleted from favourites"});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

//get favourites books of a particular user
router.get('/get-fav-books',authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData = await User.findById(id).populate("favourities");
        const favourities=userData.favourities;
        return res.json({status:"success",data:favourities})
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})
module.exports=router;