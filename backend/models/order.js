const mongoose=require("mongoose");

const order=new mongoose.Schema({
    user:{
          type:mongoose.Types.ObjectId,
          ref:"user"
    },
    book:{
        type:mongoose.Types.ObjectId,
        ref:"books"
    },
    status:{
        type:String,
        enum:["order placed","out for delivery ","delivered","cancelled"],
        default:"order placed"
    },
},
{
    timestamps:true
}

)
module.exports=mongoose.model("order",order);