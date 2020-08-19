import multer from "multer";
import routes from "./routes";
import { home } from "./controllers/videoController";

const multerVideo = multer({ dest: "uploads/videos/" });
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // locals에 로컬변수 저장 이 변수들을 템플릿에서 사용가능
  res.locals.routes = routes; // 전역으로 사용하는 변수추가
  res.locals.user = req.user || null; // user가 존재하거나 아니면 존재하지 않으면 빈 object줌
  console.log(req.user);

  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home); // home으로 보냄 next()호출 안해서 다음 동작 x
  } else {
    next();
  }
}; // 로그인 되어있으면 로그인, 가입 페이지 못가게함
// 유저 아닌사람만 사용가능한 기능제한

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
