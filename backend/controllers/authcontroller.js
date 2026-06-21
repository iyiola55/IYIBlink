const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER

exports.register = async (req,res)=>{

try{

const {
name,
email,
phone,
password,
role
}=req.body;


const existingUser =
await User.findOne({email});


if(existingUser){

return res.status(400).json({
message:"User already exists"
});

}


const hashedPassword =
await bcrypt.hash(password,10);



const user =
new User({

name,
email,
phone,

password:hashedPassword,

role

});


await user.save();



res.json({

message:"Account created successfully"

});


}

catch(error){

res.status(500).json({
error:error.message
});

}

};




// LOGIN

exports.login = async(req,res)=>{


try{


const user =
await User.findOne({
email:req.body.email
});



if(!user){

return res.status(400).json({
message:"User not found"
});

}



const passwordMatch =
await bcrypt.compare(
req.body.password,
user.password
);



if(!passwordMatch){

return res.status(400).json({
message:"Wrong password"
});

}



const token =
jwt.sign(

{
id:user._id,
role:user.role
},

process.env.JWT_SECRET

);



res.json({

token,

user:{
id:user._id,
name:user.name,
role:user.role
}

});


}


catch(error){

res.status(500).json({
error:error.message
});

}


};
