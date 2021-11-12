import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

router.get('/', async function(req, res) {
    // 바꾸어준 selectSql의 함수를 이용해서 각 select 구문을 실행해서 저장해준다.
    const employee = await selectSql.getEmployee();
    const department = await selectSql.getDepartment();
    // 해당 데이터를 이용해서 /select 창에 정보를 랜더 해준다. 
    res.render('select', {
        title : '직원 및 부서 테이블',
        title1 : '직원 테이블',
        title2 : '부서 테이블',
        employee,
        department
    });
});

module.exports = router;