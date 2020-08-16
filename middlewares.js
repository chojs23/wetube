import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // locals에 로컬변수 저장 이 변수들을 템플릿에서 사용가능
  res.locals.routes = routes; // 전역으로 사용하는 변수추가
  res.locals.user = {
    isAuthenticated: true,
    id: 3,
  };
  next();
};
export const uploadVideo = multerVideo.single("videoFile");
