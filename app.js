import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
// import Cookies, { Cookie } from "cookies";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import "./passport";
// const express = require('express'); //node moudule import

const app = express(); // execute

const CookieStore = MongoStore(session); // 서버재시작,새로고침해도 로그인 세션 유지

app.set("view engine", "pug");
// const PORT=4000;
// function handleListening(){
//     console.log(`Listening on: http://localhost:${PORT}`);
// }

// function handleHome(req,res){

//     res.send('Hello from home');
// }

// const handleProfile = (req,res) => res.send("You are on my profile")
// //middleware -> next는 다음에 실행할 함수
// const betweenHome =(req,res,next)=>{
//     console.log('Between');
//     next();
// };

// app.use -> 모든 route에서 middleware 실행
app.use(helmet()); // 보안용
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static")); // 누군가 /static으로 가려하면 static폴더로 가라
app.use(cookieParser()); // 쿠키 전달받아서 사용할 수 있도록 만들어주는 middleware
app.use(bodyParser.json()); // 사용자가 웹으로 전달하는 정보 검사
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common")); // morgan -> 기록함

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }), // cookieStore와 mongo간의 연결을 만들어 줌
    // mongoose는 이 저장소를 mongoDB에 연결해줌
  })
); // session은 쿠키를 해독함 -> 실제 id가져옴
app.use(passport.initialize()); // cookieparser로부터 쿠키가 내려와서
// passport가 쿠키를 보고 그 정보에 해당하는 사용자 찾음
// 찾은 사용자를 request의 object -> req.user로 만들어줌
app.use(passport.session()); // !! need to install express-session
// 여기서해독된 id가 passport로 넘어감

app.use(localsMiddleware);

// app.use("/",globalRouter);
app.use(routes.home, globalRouter);
// app.use("/users",userRouter);
app.use(routes.users, userRouter);
// app.use("/videos",videoRouter);
app.use(routes.videos, videoRouter);

// app.get("/",betweenHome,handleHome);//betweenhome 다음 handleHome 실행

app.use("/user", userRouter);
// app.listen(PORT,handleListening);//when you start listening call handleListening

export default app;
