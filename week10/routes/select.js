import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

// get을 통해서 department 정보와 lecture 정보를 받아온다.
// 이후 이를 render 값에 넣어주면서 hbs를 통해서 출력이 되도록 만든다. 
router.get('/', async function(req, res) {
    const department = await selectSql.getDepartment(); 
    const lecture = await selectSql.getLecture();

    res.render('select', {
        title1: 'IT 공대',
        title2: '강의 목록',
        department,
        lecture
    });    
});

module.exports = router;