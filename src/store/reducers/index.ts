import { combineReducers } from "@reduxjs/toolkit";
import mediaReducer from "./media";
import postReducer from "./posts";

const rootReducer = combineReducers({
  media: mediaReducer,
  post: postReducer,
});

export default rootReducer;
