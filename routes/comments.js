const express = require("express"); //**
const router = express.Router();
const Commt = require("../schemas/comment")

router.post("/:postId", async (req,res) => { //작성
    const {postId} = req.params;
    const { user, password, content} = req.body;
    if (content === ""){
        res.json({"message":"댓글 내용을 입력해주세요"});
    } else {
        const createcommt = await Commt.create({ postId ,user, password, content })
        res.json({"message":"댓글이 생성되었습니다."});
    }
});

router.get("/:postId", async (req, res) => { //조회
    const {postId} = req.params; //특정 게시물을 가진 postId 를 넘겨주기 위해서 생성.
    const commtList = await Commt.find({postId}).sort("-createdAt"); // find({postId}) => 게시글이 갖고있는 postId
    const comt = commtList.map((comt)=>{
        commentId = comt._id,
        user = comt.user,
        content = comt.content,
        createdAt = comt.createdAt
        return {"commentId":commentId, "user":user, "content":content, "createdAt":createdAt}
    })
    res.json({ commtlist : comt});
});

router.put("/:commentId", async (req,res) => {
    const {commentId} = req.params; 
    const commtpass = await Commt.findOne({_id:commentId})
    const {password, content} = req.body; 
    if (content === ""){
        res.send({result:"댓글을 입력해주세요"})
    } else if (password === commtpass.password){
        await Commt.updateOne({_id:commentId},{$set: {content}})
        res.send({result: "댓글을 수정하였습니다."})
    } else {
        res.send({result:"다시 입력하거라"})
    }
});

router.delete("/:commentId", async (req, res) => { 
    const {commentId} = req.params;  //commentId를 파람스로 갖고와서
    const commtpass = await Commt.findOne({_id:commentId})  //받아온 commentId는 _id다. 특정한 _id값을 받아온거고 넣어준것.
    const {password} = req.body
    if (password === commtpass.password){ 
        await Commt.deleteOne({_id:commentId}); // _id가 commentId 인걸 찾아서 지워준다.
        res.send({result: "댓글을 삭제하였습니다."}); 
    } else {
        res.send({result:"다시 입력해보거라"}); 
    }
});


module.exports = router;