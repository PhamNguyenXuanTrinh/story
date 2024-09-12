// api.js
import axios from "./axios";

// Fetch multiple stories with a limit
export const apiGetStory = (limit) =>
  axios({
    url: `story/`,
    method: "get",
    params: {
      limit, // adds the limit parameter to the request
    },
  });

// Fetch a single story by its ID
export const apiGetSingleStory = (slug) =>
  axios({
    url: `story/${slug}`, // Endpoint to fetch a single story by ID
    method: "get",
  });
export const apiGetGenre = (slug) =>
  axios({
    url: `genre/${slug}`, // Endpoint to fetch a single story by ID
    method: "get",
  });
export const apiGetChapters = (id) =>
  axios({
    url: `chapter/all/${id}`, // Endpoint to fetch a single story by ID
    method: "get",
  });
export const apiGetChapter = (slugStory, slugChapter) =>
  axios({
    url: `chapter/${slugStory}/${slugChapter}`, // Endpoint to fetch a single story by ID
    method: "get",
  });
