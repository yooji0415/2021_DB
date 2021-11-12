import express from "express";
import logger from "morgan";
import path from "path";

import homeRouter from "../routes/home"
import updateRouter from "../routes/update"
import selectRouter from "../routes/select"

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

app.use('/', homeRouter);
app.use('/update', updateRouter);
app.use('/select', selectRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})