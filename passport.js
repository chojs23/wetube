import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // strategy : 로그인 하는 방법

passport.serializeUser(User.serializeUser()); // 쿠키에 user.id 담음
passport.deserializeUser(User.deserializeUser()); // id로 사용자 식별
