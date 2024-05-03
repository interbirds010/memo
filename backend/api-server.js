"use strict";

// 모듈
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./database");

app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함도리 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));


// 조회 쿼리를 별도의 함수로 정의
function fetchMemos() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM memos";
        db.query(query, [], (err, data) => {
            if (err) reject(`${err}`);
            else resolve(data); // 데이터를 resolve로 전달
        });
    });
}


// GET 요청
app.get("/", (req, res) => {
    fetchMemos()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});


// POST 요청
app.post("/", (req, res) => {
    new Promise((resolve, reject) => {
        const query = "INSERT INTO memos(content) VALUES(?)";
        db.query(
            query,
            [req.body.content],
            (err) => {
                if (err) reject(`${err}`);
                else resolve(); // 성공적으로 업데이트되었을 때 resolve 호출
            });
    })
        .then(fetchMemos)
        .then((data) => {
            res.send(data); // 최종 결과를 응답으로 전송
        })
        .catch((err) => { // 오류 처리
            console.error(err);
            res.status(500).send(err);
        });
});


// PUT 요청
app.put("/:idx", (req, res) => {
    new Promise((resolve, reject) => {
        const query = "UPDATE memos SET content = ? WHERE idx = ?";
        db.query(
            query,
            [req.body.content, req.params.idx],
            (err) => {
                if (err) reject(`${err}`);
                else resolve();
            });
    })
        .then(fetchMemos)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(err);
        });
});


// 서버실행
app.listen(port, () => {
    console.log(`${port}번 포트에서 서버실행`);
});