// 필요한 내용들을 import 해준다. 
import express from "express";
import logger from "morgan";
import path from "path";

// 각 창별 라우터를 설정해준다.
import loginRouter from "../routes/login"
import adminDeleteRouter from "../routes/adminDelete"
import adminInsertRouter from "../routes/adminInsert"
import adminUpdateRouter from "../routes/adminUpdate"
import userReservationRouter from "../routes/userReservation"
import userSearchRouter from "../routes/userSearch"
import userDeleteRouter from "../routes/userDelete"

// express와 nodemon 기반의 설정을 해주고 
// 어떠한 창에 띄울지 설정해준다.
// 이후 어떠한 router와 창을 연결해줄지 설정해준다. 
const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

// 각 라우터별 창을 연결해준다.
app.use('/', loginRouter);
app.use('/adminDelete', adminDeleteRouter);
app.use('/adminInsert', adminInsertRouter);
app.use('/adminUpdate', adminUpdateRouter);
app.use('/userReservation', userReservationRouter);
app.use('/userSearch', userSearchRouter);
app.use('/userDelete', userDeleteRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})