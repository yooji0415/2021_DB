import express from "express";
import { insertSql, selectSql } from "../database/sql";

const router = express.Router();

// 홈 화면에 대한 정보를 설정해준다.
router.get('/', (req, res) => {
    res.render('adminInsert', {title : '관리자 삽입 페이지'});
});

// 홈 화면에 표시될 정보를 설정해준다.
router.post('/', (req, res) => {
    const vars = req.body;
    const var_length = Object.keys(req.body).length;

    // vars의 정보가 4를 넘는다는 것은 LEG_INSTANCE 데이터기 때문에 따로 설정해준다.
    if(var_length > 4){
        const data = {
            Flight_number: vars.flight_number,
            Leg_number: vars.leg_number,
            Date: vars.date,
            Airplane_id: vars.airplane_id_leg,
            Departure_time: vars.departure_time,
            Arrival_time: vars.arrival_time,
            Number_of_available_seats: vars.number_of_available_seats,
        };
        // 이후 해당 데이터를 이용해서 정보를 추가해준다.
        insertSql.insertLegIn(data);
    } 
    // vars의 정보가 4보다 작거나 같고 2를 넘는다는 것은 AiRPORT 데이터기 때문에 따로 설정해준다.
    else if(var_length > 2){
        const data = {
            Airport_code: vars.airport_code,
            Name: vars.name,
            City: vars.city,
            State: vars.state,
        };
        // 이후 해당 데이터를 이용해서 정보를 추가해준다.
        insertSql.insertAirport(data);
    } 
    // vars의 정보가 2보다 작거나 같다는 것은 AIRPLANE 데이터기 때문에 따로 설정해준다.
    else {
        const data = {
            Airplane_id: vars.airplane_id,
            Airplane_type: vars.airplane_type,
        };
        insertSql.insertAirplane(data);
    }

    res.redirect('/adminInsert');
})

module.exports = router;