
const mongoose = require("mongoose");

const commtSchema = new mongoose.Schema({
    postId :{
        type: String,
        required:true,
        
    },
    user:{
        type: String,
        required: true,
    
    },
    password : {
        type: String,
        required: true,        
    },
    content : {
        type: String,
        
    },       
    },
    {
        timestamps : true
    });


module.exports = mongoose.model("Comment",commtSchema);