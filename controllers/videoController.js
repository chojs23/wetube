import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); //async는 기다리라는 뜻? await쓰려면 async 필요
    console.log(videos); //await부분이 끝나지 전에는 다음 부분 실행 안함
    res.render("home", { pageTitle: "Home", videos }); //pageTitle이 home템플릿으로 전달
  } catch {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  //const searchingBy =req.query.term;
  const {
    query: { term: searchingBy },
  } = req;

  //const searchingBy=req.query.params
  res.render("Search", {
    pageTitle: "Search",
    searchingBy: searchingBy,
    videos,
  });
};
//export const videos = (req, res) => res.render("Videos",{pageTitle:"Videos"});
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;

  //To Do : Upload and save video
  res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
