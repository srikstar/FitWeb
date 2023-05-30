const mongoose = require("mongoose");

const uplodesSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    num:{
        type:String,
        required:true,
    },
    file:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
})



module.exports = uplodes = mongoose.model("uplodes", uplodesSchema)