import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./authSlice";

const appStore = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export default appStore;
