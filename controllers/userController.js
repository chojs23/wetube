import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req; // =req -> inside of req
  console.log(req.body.password, password2);
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
    } catch (error) {
      console.log(error);
    }
    // To Do : Log User In
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

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
