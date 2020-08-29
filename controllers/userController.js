import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req; // =req -> inside of req

  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });

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

export const githubLogin = passport.authenticate("github"); // 이거 실행되면 passport의 strategy를 이용

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email }); // mongoDB에서 git profile로 얻은 이메일과 같은 이메일 찾음
    if (user) {
      // 사용자가 가입되어 있는데 github 이메일과 같은 이메일이면
      // 로그인시키고 사용자 githubID 업데이트시킴
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook"); // 이거 실행되면 passport의 strategy를 이용

// eslint-disable-next-line no-unused-vars
export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    // eslint-disable-next-line no-unused-vars
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout(); // passport 사용할 때 이러면 로그아웃
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).populate("videos");
  res.render("userDetail", {
    pageTitle: "User Detail",
    user,
  });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);

    res.render("userDetail", {
      pageTitle: "User Detail",
      user,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", {
    pageTitle: "Edit Profile",
  });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file, // multer기능
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? `/${file.path}` : req.user.avatarUrl, // file 있으면 file.path  or req.user.avatarUrl
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", {
    pageTitle: "Change Password",
  });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPasswod, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(routes.changepPassword);
      return;
    }
    await req.user.changePassword(oldPasswod, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(routes.changePassword);
  }
};
