import express from "express";
import { selectSql, deleteSql, updateSql } from "../database/sql";

const router = express.Router();

// 정보를 받아온 다음에 get을 통해서 페이지에 전송해준다.
router.get('/', async function(req, res) {
    const airport = await selectSql.getAirport(); 
    const airplane = await selectSql.getAirplane();
    const legin = await selectSql.getLegIn();
    res.render('adminUpdate', {
        airport,
        airplane,
        legin,
    });    
});

// 버튼 입력시 모든 정보를 다 받아보고 undefined가 아닌 값을 찾아
// 어떠한 업데이트 작업인지를 판별해서 해당 업데이트 sql 구문을 실행한다.
router.post('/', async (req,res)=>{
    const data = {
        Airport_code: req.body.airport_code,
        Name: req.body.name,
        Airplane_id: req.body.airplane_id,
        Airplane_type: req.body.airplane_type,
        Leg_number: req.body.leg_number,
        Date: req.body.date,
        Number_of_available_seats: req.body.number_of_available_seats,
    };
    if(typeof data.Airport_code != "undefined") await updateSql.updateAirport(data);
    else if(typeof data.Date != "undefined") await updateSql.updateLegIn(data);
    else if(typeof data.Airplane_id != "undefined") await updateSql.updateAirplane(data);
    
    res.redirect('/adminUpdate');
});

module.exports = router;