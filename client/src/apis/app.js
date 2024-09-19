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

///get
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
export const apiGetAllGenre = (slug) =>
  axios({
    url: `genre/`, // Endpoint to fetch a single story by ID
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

// Search stories by query
export const apiSearchStories = (query) =>
  axios({
    url: `story/search`, // Define your search endpoint here
    method: "get",
    params: { query }, // Pass the query parameter
  });

/// ADMIN Story
export const apiAddStory = (storyData) =>
  axios({
    url: `story/`,
    method: "post",
    data: storyData, // Send storyData as the request body
  });
export const apiUpdateStory = (_id, storyData) =>
  axios({
    url: `story/${_id}`,
    method: "put",
    data: storyData,
  });

// Delete a story by _id
export const apiDeleteStory = (_id) =>
  axios({
    url: `story/${_id}`,
    method: "delete",
  });

/// ADMIN chapter
export const apiAddChapter = (storyData) =>
  axios({
    url: `chapter/`,
    method: "post",
    data: storyData, // Send storyData as the request body
  });
export const apiUpdateChapter = (_id, storyData) =>
  axios({
    url: `story/${_id}`,
    method: "put",
    data: storyData,
  });

// Delete a story by _id
export const apiDeleteChapter = (_id) =>
  axios({
    url: `story/${_id}`,
    method: "delete",
  });
