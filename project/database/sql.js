import mysql from "mysql2";

// mysql 접근을 위한 설정이다.
const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'project',
        password: 'Gch17015*',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

// 데이터베이스 풀 객체 생성
const promisePool = pool.promise();
export const selectSql = {
    getUsers : async () => {
      const[rows] = await promisePool.query(`select * from user`);

      return rows
    },
    getAirport : async () => { 
      const [rows] = await promisePool.query(`select * from airport`);
  
      return rows
    },
    getAirplane : async () => { 
      const [rows] = await promisePool.query(`select * from airplane`);
  
      return rows
    },
    getLegIn : async () => { 
      const [rows] = await promisePool.query(`select * from leg_instance`);
  
      return rows
    },
    getSeatReservation : async (data) => {
      const [rows] = await promisePool.query(`select * from seat_reservation where User_ID = "${data.User_ID}"`);

      return rows
    },
}

export const insertSql = {
  insertAirport : async (data) => {
      const sql = `insert into airport values ( 
          ${data.Airport_code}, "${data.Name}", "${data.City}", "${data.State}" )`;
      
      await promisePool.query(sql);
  },
  insertLegIn : async (data) => {
    const sql = `insert into leg_instance values (
        ${data.Flight_number}, ${data.Leg_number}, "${data.Date}", ${data.Airplane_id},
        "${data.Departure_time}", "${data.Arrival_time}", ${data.Number_of_available_seats} )`;
  
    await promisePool.query(sql);
  },
  insertAirplane : async (data) => {
      const sql = `insert into airplane values (
          ${data.Airplane_id}, "${data.Airplane_type}")`;
    
    await promisePool.query(sql);
  },
  insertReservation: async (data) => {
    const sql = `insert into seat_reservation values (
       "${data.User_ID}", ${data.Flight_number}, ${data.Leg_number}, "${data.Date}", ${data.Seat_number})`;
    await promisePool.query(sql);
  }
}

export const deleteSql = {
    deleteAirport : async (data) => { 
      console.log('deleteSql.deleteAirport:', data.Airport_code); // 공항 코드를 통한 삭제
      const sql = `delete from airport where Airport_code=${data.Airport_code}`;
      await promisePool.query(sql)
    },
    deleteLegIn : async (data) => {
      console.log('deleteSql.deleteLegIn:', data.Date); // Leg_number를 통한 삭제
      const sql = `delete from leg_instance where Leg_number=${data.Leg_number}`;
      await promisePool.query(sql)
    },
    deleteAirplane : async (data) => {
      console.log('deleteSql.deleteAirplane:', data.Airplane_id); // 비행기 아이디를 통한 삭제
      const sql = `delete from airplane where Airplane_id="${data.Airplane_id}"`;
      await promisePool.query(sql)
    },
    deleteReservation : async (data) => {
      console.log('deleteSql.deleteReservation:', data.User_ID); // User_ID 와 Seat_number를 통한 삭제
      const sql = `delete from seat_reservation 
                    where User_ID="${data.User_ID}" and Seat_number = ${data.Seat_number}`;
      await promisePool.query(sql)
    },
}

export const updateSql = {
  updateAirport : async (data) => { // 공항 코드을 통한 Name update
      const sql = `update airport set Name = "${data.Name}" where Airport_code = ${data.Airport_code}`;
      await promisePool.query(sql);
  },
  updateAirplane : async (data) => { // 비행기 아이디를 통한 Airplane_type update
      const sql = `update airplane set Airplane_type = "${data.Airplane_type}" where Airplane_id = ${data.Airplane_id}`;
      await promisePool.query(sql);
  },
  updateLegIn : async (data) => { // 날자와 Leg_number 두개를 통한 남은 좌석 update 
    const sql = `update leg_instance set Number_of_available_seats = ${data.Number_of_available_seats} 
    where Date = "${data.Date}" and Leg_number = ${data.Leg_number}`;
    await promisePool.query(sql);
  },
}