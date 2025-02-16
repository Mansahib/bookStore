const router=require("express").Router();
const  User  = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken=require('./userAuth');
const Book = require("../models/books");
const Order=require ("../models/order");
const user = require("../models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Ensure order is an array
        if (!Array.isArray(order)) {
            return res.status(400).json({ message: "Invalid order format. Expected an array." });
        }

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromdb = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromdb._id }
            });

            // Clear after adding
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        res.status(200).json({ status: "success", message: "Order placed successfully" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

//get order history of particular order
router.get("/get-order-history",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers
        const userData=await User.findById(id).populate({
            path:"orders",
            populate:{ path:"book"}
        });

        const ordersData=userData.orders.reverse();
        res.status(200).json({status:"success",message:"Order history",data:ordersData});
    }
    catch(err)
    {
        return res.status(400).json({message: err.message});
    }
})
//get all orders --admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try{
        const userData=await Order.find().populate({
            path:"book",
        }).populate({
            path:"user",
        }).sort({createdAt:-1});
        res.status(200).json({status:"success",message:"All orders",data:userData });
    }
    catch(err){
        return res.status(400).json({message: err.message});
    }
})
//update order status
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
try{
const{id}=req.params;

await Order.findByIdAndUpdate(id,{status : req.body.status});
res.status(200).json({status:"success",message:"Order status updated"});
}catch(err){
    return res.status(400).json({message: err.message});
}
})
module.exports=router;