const express = require("express");
const app = express();
const bodyPasrer = require("body-parser");
const mongoose = require("mongoose");

app.use(bodyPasrer.json());
mongoose.connect("mongodb://127.0.0.1:27017/customers").then(()=> console.log("data base connected"));

require('./config.js');
const Custmer = mongoose.model("custmers");;
app.get('/',(req,res)=>{
    console.log("welcome to home custmers!");
    res.json("success")
});

app.post('/customer',(req,res)=>{
    console.log("enetrd here")
    const newCustmer ={
        name : req.body.name,
        age : req.body.age,
        address : req.body.address
    };
    const custmer = new Custmer(newCustmer);
    custmer.save().then((response)=>{
        res.json("cutsmer created")
    }).catch((err)=>{
        console.log(err.meassge);
        throw(err);
    })
});

app.get('/cutsmers',(req,res)=>{
    Custmer.find().then((custmers)=>{
        res.json(custmers)
    }).catch((err)=> console.log(err))
});

app.get('/custmers/:id',(req,res)=>{
    console.log("enterd at custmer")
    Custmer.findById(req.params.id).then((custmer)=>{
        res.json(custmer);
    }).catch((err)=>console.log(err.meassge));
});

app.delete('/custmers/:id',(req,res)=>{
    Custmer.findByIdAndDelete(req.params.id).then((response)=>{
        console.log(response);
        if(response) res.json("successfully deleted")
        else res.json("invalid id");
    }).catch((err)=>console.log(err.meassge));
})

app.listen(3001,()=>console.log("server started at 3001"))