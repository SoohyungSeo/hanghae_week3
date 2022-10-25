const express = require("express"); // express에서 제공되는 Router 함수를 사용해 Router 생성 **
const router = express.Router(); //Router 생성 **
const Posts = require("../schemas/post")

router.post("/", async (req, res) =>{     //포스트방식 
    const { user, password, title, content } = req.body; // user, password, title, contetn 는 body로 요청으로 넘어온것.
    const createdposts = await Posts.create({ user, password, title, content}); // 입력한 user, password, title, content가 몽고DB에 저장되는것.      
    res.json({"message" : "게시글을 생성하였습니다."}) // 성공하면 이 메세지 전달.
    });

router.get("/", async (req, res) =>{ //GET 방식으로
    const borderList = await Posts.find({}).sort("-createdAt"); // borderlist(변수)의 전체 전체 post list를 찾아주는데 내림차순으로 정렬해준다.
    const post = borderList.map((post) => {
        title = post.title,
        user = post.user,
        createdAt = post.createdAt,
        postId = post._id
        return{"title":title, "user":user, "createdAt":createdAt, "postId":postId};
    });
    res.json({ borderlist : post }) // borderList라는 값은 borderlist 로 보내준다.
    });

router.get("/:postId", async (req,res)=>{  
    const {postId} = req.params;// {postId} 를 풀어쓰면 { postId : postId }  const { postId } = req.params // const postId = req.params.postId
    const border = await Posts.findOne({_id:postId}) //border(변수) postId값이 일치하는 doc 하나를  갖고온다
    const {user, title, content,createdAt} = border //필요한 것들만 다시 담아와서
    const post = {           //findOne 은 배열이 아니라 객체였기때문에 map을 못쓰고), post 로 담아준것.
        postId,
        user,
        title,
        content,
        createdAt
    }
    res.json({detail : post}); // detail 는 border를 담아서 json으로 넘겨준다. 
    });

router.put("/:postId", async (req,res) => {
    const {postId} = req.params; 
    const userpass = await Posts.findOne({_id:postId}) // 여기서부터 (기존에 등록된 전체 doc을 변수로 잡아준것.)
    const {password, title, content} = req.body; // 바디형식으로 보내주는것. password 값은 일치하는지 봐야해서, title, content 는 바꿔줘야 하니까 보내준다.
    if (password === userpass.password){  // 내가입력한 비밀번호가 기존 doc의 패스워드가 일치하면
        await Posts.updateOne({_id:postId},{$set: {title, content}})   // 그 postId 의 Set안에 들어간 것들을 업데이트해주는것.    
        res.send({result: "success"});  // 성공하면 메세지
    } else {
        res.send({result: "다시 입력하거라"})  // 아니면 실패메시지.
    }
    });

router.delete("/:postId", async (req, res) => { 
    const {postId} = req.params; 
    const userpass = await Posts.findOne({_id:postId})  // 여기서부터 (기존에 등록된 전체 doc을 변수로 잡아준것.)
    const {password} = req.body // 바디형식으로 보내주는것. 비밀번호만 필요하니까 비밀번호만 보내준다.
    if (password === userpass.password){ // 내가입력한 비밀번호가 기존 doc의 패스워드가 일치하면
        await Posts.deleteOne({_id:postId}); 
        res.send({result: "success"}); // 성공하면 메세지
    } else {
        res.send({result:"다시 입력해보거라"}); // 아니면 실패메시지.
    }
    });

module.exports = router; //Router 을 app.js에서 사용하기 위해 내보내주는 코드 **

