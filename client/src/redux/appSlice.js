import { createSlice } from "@reduxjs/toolkit";
import { apiGetStory } from "./action";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    stories: null,
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    // Handling the pending state when fetching stories
    builder.addCase(apiGetStory.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null; // Reset any previous error messages
    });

    // Handling the fulfilled state when stories are fetched successfully
    builder.addCase(apiGetStory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stories = action.payload; // Storing the fetched stories
    });

    // Handling the rejected state when the fetch fails
    builder.addCase(apiGetStory.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload?.message || "Failed to fetch stories"; // Store the error message
    });
  },
});

export default appSlice.reducer;
