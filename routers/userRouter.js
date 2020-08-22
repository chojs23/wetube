import express from "express";
import routes from "../routes";

import {
  userDetail,
  getEditProfile,
  changePassword,
  postEditProfile,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

// userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));
