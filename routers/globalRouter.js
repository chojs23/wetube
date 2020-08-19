import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
// postjoin 다음에 postlogin 실행
// middleware가 정보를 다음 함수로 넘겨줌
// middleware postjoin이 postlogin으로 정보를 넘겨줌
// postJoin은 이메일,패스워드 등 정보들을 받아서 사용자를 가입시키고
// next()가 호출되어 같은 정보 전달
globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, logout);

export default globalRouter;
