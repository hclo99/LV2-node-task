const express = require("express"); // 웹서버를 구현하기 위해 express 호출
const app = express();
const port = 3000; // 원하는 포트 번호
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");
const connect = require("./schemas");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸어요."); //실제로 앱을 실행하는 부분
});
