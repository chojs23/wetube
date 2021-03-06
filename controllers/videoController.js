import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Commnet";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // async는 기다리라는 뜻? await쓰려면 async 필요
    // console.log(videos); // await부분이 끝나지 전에는 다음 부분 실행 안함
    res.render("home", { pageTitle: "Home", videos }); // pageTitle이 home템플릿으로 전달
  } catch {
    // eslint-disable-next-line no-undef
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  // const searchingBy =req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }); // $regex mongoDB 제이쿼리 regular expression이용
  } catch (error) {
    console.log(error);
  }
  // const searchingBy=req.query.params
  res.render("Search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};
// export const videos = (req, res) => res.render("Videos",{pageTitle:"Videos"});
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments"); // populate -> 걔들 내용 가져오고 싶을때

    res.render("VideoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
}; // controller에서 어떤 data를 가지고 있는 것을 표현하려면 :와 이름을 넣음
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator) {
      if (video.creator.toString() !== req.user.id) {
        throw Error();
      } else {
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
      }
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator) {
      if (video.creator != req.user.id) {
        throw Error();
      } else {
        await Video.findOneAndRemove({ _id: id });
        req.user.videos.remove(video.id);
        req.user.save();
      }
    }

    // eslint-disable-next-line no-empty
  } catch (error) {}
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });

    console.log(newComment.creator);
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Del comment
export const postDelComment = async (req, res) => {
  const {
    params: { id, commentId },
  } = req;
  console.log(id);
  console.log(commentId);
  try {
    const video = await Video.findById(id);

    video.comments.remove(commentId);

    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
