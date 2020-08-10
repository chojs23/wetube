import express from "express";
import routes from "../routes";
import {
    videos,
    upload,
    videoDetail,
    editVideo,
    deleteVideo
  } from "../controllers/videoController";
const videoRouter = express.Router();

//videoRouter.get(routes.videos, videos);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
export default videoRouter; //export default 는 파일로 전체를export함 
                            //그냥 export는 오직 한 변수만 export