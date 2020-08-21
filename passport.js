import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy()); // strategy : 로그인 하는 방법

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    }, // 사용자 인증이 잘 되어서 정보를 전달받을 때 사용자를 callbackURL로 대려옴
    // github페이지로 갔다가 돌아올 때, callbackURL로 돌아오면서 사용자 정보얻음
    githubLoginCallback
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://fuzzy-elephant-90.serverless.social${routes.facebookCallback}`,
    }, // 사용자 인증이 잘 되어서 정보를 전달받을 때 사용자를 callbackURL로 대려옴
    // github페이지로 갔다가 돌아올 때, callbackURL로 돌아오면서 사용자 정보얻음
    facebookLoginCallback
  )
);
passport.serializeUser(User.serializeUser()); // 쿠키에 user.id 담음
passport.deserializeUser(User.deserializeUser()); // id로 사용자 식별
