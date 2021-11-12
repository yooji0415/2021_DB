import express from "express";
import { selectSql, updateSql } from "../database/sql";

const router = express.Router();
// 우선적으로 employee 데이터와 department 데이터를 받아서 
// /update 사이트에 표출해준다. 
router.get('/employee', async (req, res) => {
    const emp_res = await selectSql.getEmployee();
    res.render('updateEmployee',{
        title: "직원 테이블 갱신",
        emp_res
    });
});
router.get('/department', async (req, res) => {
    const dept_res = await selectSql.getDepartment();
    res.render('updateDepartment',{
        title: "부서 테이블 갱신",
        dept_res
    });
});

// 이후 각 update 관련 hbs에서의 입력을 받아들이고 이를 통해서 
// 설정해준 각각의 updateSql 함수를 실행해준다. 
router.post('/employee', async (req, res) => {
    const vars = req.body;
    console.log(vars.salary);

    const data = {
        Salary: vars.salary
    }
    await updateSql.updateEmployee(data);

    res.redirect('/select');
});
router.post('/department', async (req, res) =>{
    const vars = req.body;
    console.log(vars.dname);

    const data = {
        Dname: vars.dname
    }
    await updateSql.updateDepartment(data);

    res.redirect('/select');
});
module.exports = router;