import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();

// department와 lecture의 정보를 모두 가져온다. 
// 이후 재목과 각 table의 정보를 hbs에 연결해준다. 
router.get('/', async function(req, res) {
    const department = await selectSql.getDepartment(); 
    const lecture = await selectSql.getLecture();
    res.render('delete', {
        title: '삭제 기능',
        title1: '학과 삭제',
        title2: '강의 삭제',
        department,
        lecture,
    });    
});

// post를 통해서 버튼 입력에 따른 행동을 정해준다. 
// department만 있었던 때와 다르게 Lname과 Dnumber를 모두 받아오게 만들고
// 둘중에 undefined 인 것을 구별해서 deleteSql을 다르게 적용했다. 
router.post('/', async (req,res)=>{
    console.log('delete router:', req.body.delDeBtn);
    console.log('delete router:', req.body.delLeBtn);
    const data = {
        Dnumber: req.body.delDeBtn,
        Lname: req.body.delLeBtn,
    };
    if(typeof data.Dnumber == "undefined") await deleteSql.deleteLecture(data); // 위에서 말한 비교
    else await deleteSql.deleteDepartment(data);
    

    res.redirect('/delete');
});

module.exports = router;