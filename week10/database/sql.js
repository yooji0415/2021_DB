import mysql from "mysql2";

// mysql 접근을 위한 설정이다.
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week10',
        password: 'Gch17015*',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// 데이터베이스 풀 객체 생성
const promisePool = pool.promise();

// select query를 이용해서 selectSql을 만들어준다.
// 기존에 사용하던 user, department 관련 get 함수와 
// 새롭게 기능을 추가한 lecture 관련 get 함수가 존재한다. 
export const selectSql = {
    getUsers : async () => {
      const[rows] = await promisePool.query(`select * from user`);

      return rows
    },

    getDepartment : async () => {
      const [rows] = await promisePool.query(`select * from department`);
  
      return rows
    },
    getLecture : async () => {
        const [rows] = await promisePool.query(`select * from lecture`);
    
        return rows
      },
}

// delete query를 이용해서 deleteSql을 만들어준다. 
// 이 또한 department, lecture 관련을 따로 만들어줬다.
// department의 경우에는 Dnumber를 이용해서 삭제를 해줬고 
// lecture의 경우에는 Lname을 이용해서 삭제를 해준다. 
export const deleteSql = {
    // data라는 객체 타입의 파라미터에 입력할 정보를 받아서 query문 생성
    deleteDepartment : async (data) => { 
      console.log('deleteSql.deleteDepartment:', data.Dnumber);
      const sql = `delete from department where Dnumber=${data.Dnumber}`;
      await promisePool.query(sql)
    },

    deleteLecture : async (data) => {
        console.log('deleteSql.deleteLecture:', data.Lname);
        const sql = `delete from lecture where Lname="${data.Lname}"`;
        await promisePool.query(sql)
    },

  }