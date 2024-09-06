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
export const apiGetSingleStory = (id) =>
  axios({
    url: `story/${id}`, // Endpoint to fetch a single story by ID
    method: "get",
  });
  export const apiGetGenre = (id) =>
    axios({
      url: `genre/${id}`, // Endpoint to fetch a single story by ID
      method: "get",
    });
  