const express = require("express"); // express에서 제공되는 Router 함수를 사용해 Router 생성 **거의 디폴트값으로 쓰는것
const app = express(); //** 
const postrouter = require("./routes/posts") //미들웨어
const commtrouter = require("./routes/comments") //미들웨어
const connect = require("./schemas"); //DB에 연결해주는거 **
connect(); //**

app.use(express.urlencoded({ extended: true }));//Router 미들웨어 //쿼리할때 필요. **
app.use(express.json());//Router 미들웨어 **
app.use('/posts',[postrouter]);  //Router 미들웨어
app.use('/comments',[commtrouter]);//Router 미들웨어

app.listen(3000, () => {         //**
    console.log('서버가 3000포트로 열렸습니다.')
});

