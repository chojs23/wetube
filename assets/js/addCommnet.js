import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const commentBtn = document.getElementById("jsCommentBtn");
const selectedComment = document.getElementById("selectedComment");
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleSubmit = (event) => {
  event.preventDefault(); // 새로고침 x
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(selectedComment.innerHTML);
  const commentId = selectedComment.innerHTML;
  fetch(`/api/${videoId}/comment/${commentId}/del`, { method: "POST" });
};

const delComment = () => {
  document.removeChild();
};

const handelDel = () => {
  registerView();
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  if (commentBtn) {
    commentBtn.addEventListener("click", handelDel);
  }
}

if (addCommentForm) {
  init();
}
