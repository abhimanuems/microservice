const mongoose = require("mongoose");

mongoose.model("custmer",{
    name :{
        type:String,
        require:true
    },
    age :{
        type :Number,
        require:true
    },
    address:{
        type:String,
        require:false
    }
})