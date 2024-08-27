import axios from "./axios";
export const apiGetStory = () =>
  axios({
    url: "story/",
    method: "get",
  });
