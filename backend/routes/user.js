const router=require("express").Router();
const  User  = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken=require('./userAuth');
//sign up
router.post("/sign-up",async (req, res) => {
try{
const {username,email,password,address}=req.body;


//username length check
if(username.length<4)
{
    return res.status(400).json({message:"username must be at least 4 characters long "});
}

//checkin unique username
const existingUsername=await User.findOne({username:username});
if(existingUsername)
{
    return res.status(400).json({message:"username already exists "});
}


//checking email
const existingEmail=await User.findOne({email:email});
if(existingEmail)
{
    return res.status(400).json({message:"email already exists "});
}


//checking password
if(password.length<=5)
{
    return res.status(400).json({message:"password must be at least 6 characters long "});
}
const hashPass=await bcrypt.hash(password,10);
const newUser= new User({username:username,email:email,password:hashPass,address:address});
await newUser.save();
res.status(200).json({message:"user created successfully/ sign up  successful "});

}
catch(err){
    res.status(500).json({message:"internal server error"});
}

})
// sign in 

router.post("/sign-in",async (req, res) => {
    try{
        const {username,password}=req.body;
        const existingUser= await User.findOne({username});
        if(!existingUser){
            return res.status(400).json({message:"username does not exist "});
        }   
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    
                        {name:existingUser.username},
                        {role: existingUser.role},
                    
                ];
               const token =jwt.sign({authClaims},"bookStore123",{
                expiresIn:"30d",
            });
               res.status(200).json({id:existingUser._id, role:existingUser.role,token:token })
            
            }

            else{
                return res.status(400).json({message:"password is incorrect "});
            }
        })
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

//get user info
router.get("/get-user-info",authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const data=await User.findById(id).select("-password");
      return  res.status(200).json(data);
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

//update address
router.put("/update-address",authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const {address}=req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated successfully"});
    }
    catch(err){
        res.status(500).json({message:"internal server error"});
    }
})
module.exports=router;