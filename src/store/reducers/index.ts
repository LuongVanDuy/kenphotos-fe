import { combineReducers } from "@reduxjs/toolkit";
import mediaReducer from "./media";
import postReducer from "./posts";
import usersReducer from "./users";

const rootReducer = combineReducers({
  users: usersReducer,
  media: mediaReducer,
  post: postReducer,
});

export default rootReducer;
