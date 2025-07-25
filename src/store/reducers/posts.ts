import { ActionType, StateType } from "@/types";
import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
};

const postsReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data.data,
        total: action.payload.data.total,
        error: false,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        list: [],
      };
    default:
      return state;
  }
};

export default postsReducer;
