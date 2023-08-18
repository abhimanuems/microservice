const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser")

try{
    mongoose.connect("mongodb://127.0.0.1:27017/books").then(()=>console.log("data base connected"));
}catch(err){
    console.log("error from mongoose is ",err.message);
}
require("./config.js")
const Book = mongoose.model("books");

app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send("this is our main endpoint");
})

app.post('/book',(req,res)=>{
    console.log(req.body)
    const newBook = {
        title: req.body.title,
        author : req.body.title,
        numberPages : req.body.numberPages,
        publisher : req.body.publisher

    }
    const book = new Book(newBook);
    book.save().then(()=>{
        console.log("book created")
    }).catch((err)=>{
        console.log(err.message)
        throw(err);
    })

    res.send("testing our book route successful!");
});

app.get('/allbooks',(req,res)=>{
    Book.find().then((books)=>{
        console.log(books);
        res.json(books);
    }).catch((err)=>console.log(err.message));
});

app.get('/bookbyid/:id',(req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        console.log(book)
        res.json(book);
    }).catch((err)=>{
        console.log(err.message);
    })
});

app.delete('/deletebook/:id',(req,res)=>{
    console.log("enetr at delete")
    Book.findOneAndRemove(req.params.id).then(()=>{
        
            res.json("removed successfuly")
        
    }).catch((err)=>{
        console.log(err.message);
    })
})

app.listen(3000,()=> console.log("server started at 3000"))