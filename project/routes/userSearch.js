import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router(); 
router.get('/', async function(req, res) { 
    // 우선 필요한 정보만 출력을 해준다.
    res.render('userSearch', {
        title: '조회 페이지',
        title1: 'Seat Reservation 정보',
    });    
});

router.post('/', async (req,res)=>{ 
    // 이후 버튼이 눌리는 상황에 해당 유저의 아이디를 받아오고
    // 이 아이디를 통한 getSeatReservation 함수가 실행이 된다.
    // 해당 정보를 이후 출력해준다. 
    const data = {
        User_ID: req.body.User_ID,
    };
    
    const seat_reservation = await selectSql.getSeatReservation(data);
    res.render('userSearch', {
        title: '조회 페이지',
        title1: 'Seat Reservation 정보',
        seat_reservation,
    });  

    console.log(data.User_ID);
});

module.exports = router;