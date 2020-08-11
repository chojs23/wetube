import {videos} from "../db"
export const home = (req, res) => {

    res.render("home", {pageTitle:"Home",videos})//pageTitle이 home템플릿으로 전달

};
export const search = (req, res) => {
    //const searchingBy =req.query.term;
    const {
        query:{term:searchingBy}
    }=req;

    //const searchingBy=req.query.params
    res.render("Search",{pageTitle:"Search",searchingBy:searchingBy,videos});


};
//export const videos = (req, res) => res.render("Videos",{pageTitle:"Videos"});
export const upload = (req, res) => res.render("upload",{pageTitle:"Upload"});
export const videoDetail = (req, res) => res.render("videoDetail",{pageTitle:"Video Detail"});
export const editVideo = (req, res) => res.render("editVideo",{pageTitle:"Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo",{pageTitle:"Delete Video"});