#2021-02-database
- 데이터베이스 설계

<br><br>

## 3주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:yooji0415/2021_DB.- (token을 사용하는 경우) git clone https://github.com/yooji0415/2021_DB.git
2. week3 폴더로 이동
    - cd week3
3. 콘솔창(powershell)에서 npm package 설치
    - npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력
<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'tutorial', // 본인이 만든 데이터베이스 이름으로 수정하세요
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>
5. 서버 실행(powershell에서) 후 확인
    - npm run start
    - 브라우저를 켜서 주소창에 localhost:3000 입력

6. 기본화면
    - localhost:3000으로 들어가면 기본 화면
    - (데이터베이스 설정이 된 경우) localhost:3000/users 로 들어가면
    DB에 있는 값을 불러와서 출력

* 실습에 사용한 테이블에 관한 간단한 설명 
    - 테이블 명 : user
    - 속성 
        - num (int,not null)
        - name (char)
        - major (char)
        - year (int)
        - email (char)
    - primary key : num


<br></br>

## 8주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:yooji0415/2021_DB.- (token을 사용하는 경우) git clone https://github.com/yooji0415/2021_DB.git
2. week3 폴더로 이동
    - cd week3
3. 콘솔창(powershell)에서 npm package 설치
    - npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력
<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'tutorial', // 본인이 만든 데이터베이스 이름으로 수정하세요
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 서버 실행(powershell에서) 후 확인
    - npm run start
    - 브라우저를 켜서 주소창에 localhost:3000 입력

6. 기본화면
    - localhost:3000으로 들어가면 기본 화면
    - (데이터베이스 설정이 된 경우) localhost:3000/select 로 들어가면
    DB에 있는 값을 불러와서 출력
    -(데이터베이스 설정이 된 경우) localhost:3000/update 로 들어가면
    DB에 있는 값을 선택해서 변경 가능

* 실습에 사용한 테이블에 관한 간단한 설명 
    - 테이블 명 : employee
    - 속성 
        - Fname (varchar, not null)
        - Minit (char)
        - Lname (varchar, not null)
        - Ssn (char, not null)
        - Bdate (date)
        - Address (varchar)
        - Sex (char)
        - Salary (decimal)
        - Super_ssn (char)
        - Dno (int, not null)
    - primary key : Ssn
    <br></br>
    - 테이블 명 : department
    - 속성 
        - Dname (varchar, not null, unique)
        - Dnumber (int, not null)
        - Mgr_ssn (char, not null)
        - Mgr_start_date (date)
    - primary key : Dnumber
    <br></br>
    - department의 경우 Mgr_ssn은 employee의 Ssn을 레퍼런스 한다. 
    따라서 employee를 먼저 생성한 다음 department를 만들어야 한다.

<br></br>

## 10주차 실습 실행 방법
1. 레포지토리 복사(wsl 환경에서 명령어 입력)
    - (SSH 설정한 경우) git clone git@github.com:yooji0415/2021_DB.- (token을 사용하는 경우) git clone https://github.com/yooji0415/2021_DB.git
2. week3 폴더로 이동
    - cd week3
3. 콘솔창(powershell)에서 npm package 설치
    - npm install
4. database/sql.js에서 본인의 데이터베이스 정보 입력
<pre>
<code>
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root', // 본인의 mysql user id
    database: 'tutorial', // 본인이 만든 데이터베이스 이름으로 수정하세요
    password: 'password', // 본인의 mysql password
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }
);
</code>
</pre>

5. 서버 실행(powershell에서) 후 확인
    - npm run start
    - 브라우저를 켜서 주소창에 localhost:3000 입력

6. 기본화면
    - localhost:3000으로 들어가면 기본 로그인 화면
    - (데이터베이스 설정이 된 경우) localhost:3000/select 로 들어가면
    DB에 있는 값을 불러와서 출력
    -(데이터베이스 설정이 된 경우) localhost:3000/delete 로 들어가면
    DB에 있는 값을 선택해서 삭제 가능

* 실습에 사용한 테이블에 관한 간단한 설명 
    - 테이블 명 : user
    - 속성 
        - Id (varchar, not null)
        - Password (varchar, not null)
        - Role (varchar, not null)
    - primary key : Id
    <br></br>
    - 테이블 명 : department
    - 속성 
        - Dname (varchar, not null, unique)
        - Dnumber (int, not null)
    - primary key : Dnumber
    <br></br>
    - 테이블 명 : lecture
    - 속성 
        - Lnum (int, not null)
        - Lname (varchar, not null, unique)
    - primary key : Lnum

<br></br>

이름|과|전공|학번
---|---|---|---|
유지훈|정보통신공학과|정보통신|12171810