import express from "express";
import routes from "../routes";
const videoRouter = express.Router();

videoRouter.get(routes.videos, (req, res) => res.send("Videos"));
videoRouter.get(routes.upload, (req, res) => res.send("Upload"));
videoRouter.get(routes.videoDetail, (req, res) => res.send("Video Detail"));
videoRouter.get(routes.editVideo, (req, res) => res.send("Edit Video"));
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Video"));

export default videoRouter; //export default 는 파일로 전체를export함 
                            //그냥 export는 오직 한 변수만 export