import { ActionType, StateType } from "@/types";
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actionTypes";

const initialState: StateType = {
  loading: true,
  error: false,
  message: "",
  detail: {},
  list: [],
  total: 0,
};

const categoriesReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        total: action.payload.total,
        error: false,
      };
    case FETCH_CATEGORIES_FAILURE:
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

export default categoriesReducer;
