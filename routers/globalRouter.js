import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin,
  getMe,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

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
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin); // 먼저 사용자는 github으로 가게됨 /auth/github
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  postGithubLogin
); // 사용자가 /callback으로 돌아옴

globalRouter.get(routes.me, getMe);

export default globalRouter;
