import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
//const express = require('express'); //node moudule import

const app = express(); //execute


//const PORT=4000;
// function handleListening(){
//     console.log(`Listening on: http://localhost:${PORT}`);
// }

function handleHome(req,res){
    
    res.send('Hello from home');
}

const handleProfile = (req,res) => res.send("You are on my profile")
//middleware -> next는 다음에 실행할 함수
const betweenHome =(req,res,next)=>{
    console.log('Between');
    next();
};


//app.use -> 모든 route에서 middleware 실행
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("common"));//morgan -> 기록함


//app.get("/",betweenHome,handleHome);//betweenhome 다음 handleHome 실행
app.get("/",handleHome);

app.get("/profile",handleProfile);

app.use("/user",userRouter);
//app.listen(PORT,handleListening);//when you start listening call handleListening

export default app;