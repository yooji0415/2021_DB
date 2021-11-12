import express from "express";
import { insertSql, selectSql } from "../database/sql";

const router = express.Router();

// 홈 화면에 대한 정보를 설정해준다.
router.get('/', (req, res) => {
    res.render('home', {title : '데이터 삽입'});
});

// 홈 화면에 표시될 정보를 설정해준다.
router.post('/', (req, res) => {
    const vars = req.body;
    const var_length = Object.keys(req.body).length;

    // vars의 정보가 4를 넘는다는 것은 employee 데이터기 때문에 따로 설정해준다.
    if(var_length > 4){
        const data = {
            Fname: vars.fname,
            Minit: vars.minit,
            Lname: vars.lname,
            Ssn: vars.ssn,
            Bdate: vars.bdate,
            Address: vars.address,
            Sex: vars.sex,
            Salary: vars.salary,
            Super_ssn: vars.super_ssn,
            Dno: vars.dno
        };
        // 이후 해당 데이터를 이용해서 employee 에 정보를 추가해준다.
        insertSql.setEmployee(data);
    } else {
        const data = {
            Dname: vars.dname,
            Dnumber: vars.dnumber,
            Mgr_ssn: vars.mgr_ssn,
            Mgr_start_date: vars.mgr_start_date
        };
        // vars의 정보를 받고 해당 데이터를 이용해서 department 에 정보를 추가해준다.
        // 이 경우는 vars의 정보가 4개 이하인 경우다.
        insertSql.setDepartment(data);
    }

    res.redirect('/');
})

module.exports = router;