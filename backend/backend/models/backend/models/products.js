const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({

seller:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

name:{
type:String,
required:true
},

description:String,

category:String,

price:{
type:Number,
required:true
},

stock:{
type:Number,
default:0
},

images:[String]

});


module.exports = mongoose.model("Product", ProductSchema);
