import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req; // =req -> inside of req

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = {
        name,
        email,
      };

      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login, // 로그인 실패시 login페이지로
  successRedirect: routes.home, // 로그인 성공시 home으로
});

export const logout = (req, res) => {
  // To Do : Process Logout
  res.redirect(routes.home);
};
export const users = (req, res) => res.send("Users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", {
    pageTitle: "User Detail",
  });
export const editProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile",
  });
export const changePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password",
  });
