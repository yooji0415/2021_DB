import express from "express";
import { selectSql, deleteSql, insertSql } from "../database/sql";

const router = express.Router();


router.get('/', async function(req, res) {
    const legin = await selectSql.getLegIn();
    res.render('userReservation', {
        title: '예약 페이지',
        title1: 'Leg_Instance 정보',
        legin,
    });    
});

router.post('/', async (req,res)=>{
    const data = {
        User_ID: req.body.User_ID,
        Flight_number: req.body.Flight_number,
        Leg_number: req.body.Leg_number,
        Date: req.body.Date,
        Seat_number: req.body.Seat_number
    };
    await insertSql.insertReservation(data);
    
    res.redirect('/userReservation');
});

module.exports = router;