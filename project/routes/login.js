import express from "express";
import { selectSql } from "../database/sql";

const router = express.Router();

// get으로 
router.get('/', async (req, res) => {
    res.render('login');
});

// 로그인 버튼을 눌렀을 경우 입력값을 통해서 
// 로그인 성공 실패 혹은 관리자 유무를 판단한다.
router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getUsers(); // 유저목록을 받아온다.
    let whoAmI = ''; // admin 유무를 판별할 수 있게 변수를 만든다.
    
    let checkLogin = false; // 우선적으로 로그인은 실패로 설정한다. 
    
    users.map((user)=> {
        console.log(user.Id);
        if(vars.id === user.User_ID && vars.password === user.User_password){ // 아이디와 비밀번호를 동시에 비교한다.
            console.log('login success!'); // 맞을경우 성공 문구 출력 및 checkLogin을 true로 변경한다.
            checkLogin = true;
            if(vars.id === 'admin'){ // 입력된 아이디 값이 admin인 경우와 아닌경우에 다른 값을 넣어준다. 
                whoAmI = 'admin'; 
            } else {
                whoAmI = 'user';
            }
        }
    })

    if(checkLogin && whoAmI === 'admin'){ // admin과 일반 유저의 경우를 나눠서 연결되는 화면을 다르게 한다. 
        res.redirect('/adminDelete');
    } else if (checkLogin && whoAmI === 'user'){
        res.redirect('/userReservation');
    } else {
        console.log('login failed!'); // whoAmI에 값이 없는 것은 로그인이 틀렸다는 것으로 이를 출력해준다. 
        res.send("<script>alert('로그인에 실패하였습니다.'); location.href='/';</script>");
        res.redirect('/');
    }
});

module.exports = router;