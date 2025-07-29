import { ActionType, StateType } from "@/types";
import {
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  FETCH_PUBLIC_POSTS,
  FETCH_PUBLIC_POSTS_SUCCESS,
  FETCH_PUBLIC_POSTS_FAILURE,
  FETCH_PUBLIC_POST,
  FETCH_PUBLIC_POST_SUCCESS,
  FETCH_PUBLIC_POST_FAILURE,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  detailPublic: {},
  list: [],
  listPublic: [],
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
        listPublic: [],
      };
    case FETCH_POST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data,
        error: false,
      };
    case FETCH_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detail: {},
      };
    case FETCH_PUBLIC_POSTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PUBLIC_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        listPublic: action.payload.data.data,
        totalPublic: action.payload.data.total,
        error: false,
      };
    case FETCH_PUBLIC_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        listPublic: [],
      };
    case FETCH_PUBLIC_POST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PUBLIC_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        detailPublic: action.payload.data,
        error: false,
      };
    case FETCH_PUBLIC_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        detailPublic: {},
      };
    default:
      return state;
  }
};

export default postsReducer;
