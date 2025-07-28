import { combineReducers } from "@reduxjs/toolkit";
import mediaReducer from "./media";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import postsReducer from "./posts";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
  media: mediaReducer,
  users: usersReducer,
  posts: postsReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
});

export default rootReducer;
