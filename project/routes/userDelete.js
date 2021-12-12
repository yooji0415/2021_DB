import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();
router.get('/', async function(req, res) {
    // search와 동일하게 기본 정보들을 우선 출력한다.
    res.render('userDelete', {
        title: '취소 페이지',
        title1: 'Seat Reservation 정보',
        title2: '취소할 예약 정보를 입력해주세요',
    });    
});

router.post('/', async (req,res)=>{
    // 버튼 입력을 통한 값들을 일단 받는다. 
    const data = {
        User_ID: req.body.User_ID,
        Seat_number: req.body.Seat_number,
    };

    // 만약 유저 아이디가 입력이 된 상황이면 유저가 예약한 정보를 띄운다.
    if(typeof data.User_ID != "undefined"){
        const seat_reservation = await selectSql.getSeatReservation(data);
        res.render('userDelete', {
            title: '취소 페이지',
            title1: 'Seat Reservation 정보',
            title2: '취소할 예약 정보를 입력해주세요',
            seat_reservation,
        });  
    }
    // 만약 좌석번호와 아이디가 모두 입력되었다면 이는 취소요청이기에
    // 해당 정보를 담은 data를 보내서 삭제가 이루어진다.
    if(typeof data.Seat_number != "undefined"){
        console.log(data.User_ID);
        console.log(data.Seat_number);
        await deleteSql.deleteReservation(data);
        res.redirect('/userDelete');
    }
});

module.exports = router;