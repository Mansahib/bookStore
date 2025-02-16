const express=require("express");

const app=express();
const cors = require('cors');
require("dotenv").config();
require("./conn/conn")
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello from node")
})

const user=require("./routes/user.js");
const Books=require("./routes/book.js")
const favourite=require('./routes/favourite.js')
const cart=require("./routes/cart.js")
const order=require("./routes/order.js")
app.use(cors());
app.use("/api/v1",user)
app.use("/api/v1",Books)
app.use("/api/v1",favourite)
app.use("/api/v1",cart)
app.use("/api/v1",order)
//creating port
app.listen(process.env.PORT,()=>{
    console.log(`server started at:${process.env.PORT}`);
})