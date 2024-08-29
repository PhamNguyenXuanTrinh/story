// redux/action.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";

export const apiGetStory = createAsyncThunk(
  "app/stories",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetStory();
    if (response.data.success) return response.data;
    return rejectWithValue();
  }
);
