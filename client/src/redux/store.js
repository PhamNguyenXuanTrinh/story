import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice"; // Import the default export which is the reducer

export const store = configureStore({
  reducer: {
    app: appReducer, // Use the reducer property from the slice
  },
});

export default store;
