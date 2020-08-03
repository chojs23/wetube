//url 여기에

//Global
const HOME = "/";
const JOIN="/join";
const LOGIN="/login";
const LOGOUT="/logout";
const SEARCH="/search";

//Users
const USERS="/users";
const USER_DETAIL="/:id" // /users/1 처럼 가능
const EDIT_PROFILE="/edit-profile";
const CHANGE_PASSWORD="/change-password";

//Videos
const VIDEOS="/videos";
const UPLOAD="/upload";
const VIDEO_DETAIL="/:id";// :변하는 값 express가 알아들음
const EDIT_VIDEO="/:id/edit"; // /videos/1/edit
const DELETE_VIDEO="/:id/delete";

const routes={
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: USER_DETAIL,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: VIDEO_DETAIL,
    editVideo: EDIT_VIDEO,
    deleteVideo: DELETE_VIDEO
};

export default routes;