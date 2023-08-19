const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require('axios');

mongoose
  .connect("mongodb://127.0.0.1:27017/orders")
  .then(() => console.log("database connected"));

require("./config.js");

const Order = mongoose.model("order");
app.use(bodyParser.json());
app.get("/", (req, res) => res.json("welcome home"));
app.post("/orders", (req, res) => {
  const neworder = {
    cutsmerId: req.body.cutsmerId,
    BookId: req.body.BookId,
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate,
  };
  const order = new Order(neworder);
  order
    .save()
    .then((response) => {
      console.log("order placed");
      res.json("order placed");
    })
    .catch((err) => {
      console.log(err.message);

      if (err) throw err;
      res.json("an err ocuured");
    });
});

app.get("/allorders", (req, res) => {
  Order.find()
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => {
      if (err) throw err;
      console.log(err.message);
    });
});

app.get("/order/:id", (req, res) => {
    console.log(req.params.id);
  Order.findById(req.params.id).then(async(orders) => {
    if (orders) {
    await  axios
        .get(`http://localhost:3001/custmers/${orders.cutsmerId}`)
        .then((data) => {
            axios
              .get(`http://localhost:3000/bookbyid/${orders.BookId}`)
              .then((bookdata) => {
                console.log(bookdata.data);
                res.json([data.data.name, bookdata?.data?.title]);
              });
          
        }).catch((err)=>{console.log(err.message)
        res.json(err.message)})   
    } else {
      res.json("no orders found");
    }
  }).catch((err)=>{console.log(err.message)
throw(err)})
});

app.listen(3002, () => console.log("server started at the port 3002"));
