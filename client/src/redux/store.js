import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slice/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})