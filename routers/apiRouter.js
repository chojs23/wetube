import express from "express";
import routes from "../routes";

import {
  postRegisterView,
  postAddComment,
  postDelComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

// userRouter.get(routes.users, users);
apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.delComment, postDelComment);

export default apiRouter;
// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));
