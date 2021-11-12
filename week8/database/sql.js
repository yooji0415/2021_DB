import mysql from "mysql2";

// mysql 접근을 위한 설정이다.
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week8',
        password: 'Gch17015*',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// 데이터베이스 풀 객체 생성
const promisePool = pool.promise();

// selectSql을 불러와서 사용하고자 하는 함수를 설정하고 그에 맞는 쿼리문을 넣어준다.
export const selectSql = {
    getEmployee : async () => {
        const [rows] = await promisePool.query(`select * from employee`);
        console.log(rows)
        return rows
    },
    getDepartment : async () => {
        const [rows] = await promisePool.query(`select * from department`);
       
        return rows
    },
}

// insertSql을 불러와서 사용하고자 하는 함수를 설정하고 그에 맞는 쿼리문을 넣어준다. 
export const insertSql = {
    // 입력받은 값을 불러와서 employee 생성에 필요한 값으로 사용해준다. 
    setEmployee : async (data) => {
        const sql = `insert into employee values ( 
            "${data.Fname}", "${data.Minit}", "${data.Lname}", "${data.Ssn}","${data.Bdate}", 
            "${data.Address}", "${data.Sex}", "${data.Salary}", "${data.Super_ssn}", "${data.Dno}" )`;
        
        await promisePool.query(sql);
    },
    // 입력받은 값을 불러와서 department 생성에 필요한 값으로 사용해준다. 
    setDepartment : async (data) => {
        const sql = `insert into department values (
            "${data.Dname}", "${data.Dnumber}", "${data.Mgr_ssn}", "${data.Mgr_start_date}" )`;
    
        await promisePool.query(sql);
    },
}

// updateSql을 불러와서 사용하고자 하는 함수를 설정하고 그에 맞는 쿼리문을 넣어준다.
export const updateSql = {
    // updateEmployee의 경우에는 1000보다 작은 연봉이 있을 경우에 바꿔주는 것으로 설정했습니다.
    updateEmployee : async (data) => {
        const sql = `update employee set salary = "${data.Salary}" where Salary < 1000`;
        await promisePool.query(sql);
    
    },
    // updateDepartment의 경우에는 Dnumber가 1인 경우의 것만 이름을 바꿀 수 있도록 설정했습니다.
    updateDepartment : async (data) => {
        const sql = `update department set dname = "${data.Dname}" where Dnumber = 1`;
        await promisePool.query(sql);
    },
}