import { combineReducers } from "@reduxjs/toolkit";
import mediaReducer from "./media";
import usersReducer from "./users";
import categoriesReducer from "./categories";
import postsReducer from "./posts";
import settingsReducer from "./settings";
import servicesReducer from "./services";
import ordersReducer from "./orders";

const rootReducer = combineReducers({
  media: mediaReducer,
  users: usersReducer,
  posts: postsReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
  services: servicesReducer,
  orders: ordersReducer,
});

export default rootReducer;
