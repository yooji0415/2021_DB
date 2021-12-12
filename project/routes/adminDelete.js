import express from "express";
import { selectSql, deleteSql } from "../database/sql";

const router = express.Router();


router.get('/', async function(req, res) { 
    // 필요한 정보를 selectSql로 받아서 정보 출력
    const airport = await selectSql.getAirport(); 
    const airplane = await selectSql.getAirplane();
    const legin = await selectSql.getLegIn();
    res.render('adminDelete', {
        title: '관리자 삭제 페이지',
        title1: 'Airport 정보',
        title2: 'Airplane 정보',
        title3: 'Leg_Instance 정보',
        airport,
        airplane,
        legin,
    });    
});

router.post('/', async (req,res)=>{
    // 각 버튼이 눌렸을 때 값이 있는 (undefined 가 아닌 값) 위치를 파악하고 
    // 이를 통해서 눌린 버튼을 판별하고 이에 따른 deleteSql이 진행된다. 
    const data = {
        Airport_code: req.body.delAirBtn,
        Leg_number: req.body.delLegInBtn,
        Airplane_id: req.body.delPlaneBtn,
    };
    if(typeof data.Airport_code != "undefined") await deleteSql.deleteAirport(data);
    else if(typeof data.Leg_number != "undefined")await deleteSql.deleteLegIn(data);
    else if(typeof data.Airplane_id != "undefined")await deleteSql.deleteAirplane(data);
    res.redirect('/adminDelete');
});

module.exports = router;