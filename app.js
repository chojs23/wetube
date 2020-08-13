import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalRouter from "./routers/globalRouter";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
//const express = require('express'); //node moudule import

const app = express(); //execute

app.set("view engine", "pug");
//const PORT=4000;
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

//app.use -> 모든 route에서 middleware 실행
app.use(helmet()); //보안용
app.use(cookieParser()); //쿠키 전달받아서 사용할 수 있도록 만들어주는 middleware
app.use(bodyParser.json()); //사용자가 웹으로 전달하는 정보 검사
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common")); //morgan -> 기록함

app.use(localsMiddleware);

//app.use("/",globalRouter);
app.use(routes.home, globalRouter);
//app.use("/users",userRouter);
app.use(routes.users, userRouter);
//app.use("/videos",videoRouter);
app.use(routes.videos, videoRouter);

//app.get("/",betweenHome,handleHome);//betweenhome 다음 handleHome 실행

app.use("/user", userRouter);
//app.listen(PORT,handleListening);//when you start listening call handleListening

export default app;
