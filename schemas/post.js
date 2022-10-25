// const { truncate } = require("fs");
const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({ 
    user:{  //유저값
        type: String, //문자열
        required: true, //필수로 들어가는지
        unique: true, //유일해야 하는것인지
        
    },
    password:{ //비밀번호
        type: String,
        required: true,
        },
    title:{ //제목
        type: String,
        required: true

    },
    content:{ //글 작성내용
        type: String,
        required: true
    },
    
    },
    {
        timestamps : true //생성시간
    });

module.exports = mongoose.model("Posts",postsSchema); //postsSchema 를 Posts 에 담아서 exports