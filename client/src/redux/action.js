// redux/action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";
import number from "../ultils/number";
export const apiGetStory = createAsyncThunk(
  "app/stories",
  async (data, { rejectWithValue }) => {
    /// get 12 stories
    const response = await apis.apiGetStory(number.limitStories);
    if (response.status === 200) return response.data;
    return rejectWithValue();
  }
);
