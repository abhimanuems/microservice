const express = require("express");
const app = express();
const bodyPasrer = require("body-parser")

app.get('/',(req,res)=>{
    console.log("welcome to home custmers!");
    res.json("success")
})

app.listen(3001,()=>console.log("server started at 3001"))