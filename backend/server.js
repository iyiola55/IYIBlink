const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const authroutes = require("./routes/authroutes");

app.use("/api/auth", authroutes);
const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});


app.get("/", (req,res)=>{
    res.send("Marketplace API Running");
});


app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});
