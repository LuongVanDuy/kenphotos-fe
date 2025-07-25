import { combineReducers } from "@reduxjs/toolkit";
import mediaReducer from "./media";
import postReducer from "./posts";
import usersReducer from "./users";
import categoriesReducer from "./categories";

const rootReducer = combineReducers({
  users: usersReducer,
  media: mediaReducer,
  post: postReducer,
  categories: categoriesReducer,
});

export default rootReducer;
